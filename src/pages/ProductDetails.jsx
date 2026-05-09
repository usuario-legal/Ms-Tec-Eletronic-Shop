import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apiClient, withRetry } from '../services/apiClient';
import { useNotifier } from '../context/NotificationProvider';

function SimilarProductsError({ onRetry }) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Alert
      severity="warning"
      variant="outlined"
      icon={<CloudOffIcon fontSize="inherit" />}
      sx={{
        borderRadius: 2,
        borderWidth: 2,
        alignItems: 'center',
        background: theme => `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
        '& .MuiAlert-message': { width: '100%' },
      }}
      action={
        <Stack direction="row" spacing={1}>
          <Button size="small" startIcon={<RefreshIcon />} onClick={onRetry}>
            Tentar novamente
          </Button>
          <Button size="small" component={Link} href="https://weaviate.io" target="_blank" rel="noopener" endIcon={<OpenInNewIcon />}>
            Documentação
          </Button>
        </Stack>
      }
    >
      <AlertTitle>Produtos similares indisponíveis</AlertTitle>
      Não foi possível carregar recomendações no momento. Tente novamente mais tarde.
      <Box sx={{ mt: 1 }}>
        <Button
          size="small"
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: showDetails ? 'rotate(180deg)' : 'none',
                transition: '0.2s',
              }}
            />
          }
          onClick={() => setShowDetails(v => !v)}
        >
          {showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        </Button>
        <Collapse in={showDetails}>
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              mt: 1,
              bgcolor: theme => theme.palette.action.hover,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 12,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            Serviço de recomendações temporariamente indisponível. Continue explorando nossos produtos.
          </Paper>
        </Collapse>
      </Box>
    </Alert>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [recLoading, setRecLoading] = useState(true);
  const [similarError, setSimilarError] = useState(false);
  const { notify } = useNotifier();

  const normalizeProduct = useCallback(prod => {
    if (!prod || typeof prod !== 'object') return null;
    const candidate = prod._id ?? prod.id ?? prod.mongoId ?? prod?.metadata?.mongoId;
    const normalizedId = candidate !== undefined && candidate !== null ? `${candidate}` : undefined;

    return normalizedId
      ? {
          ...prod,
          id: normalizedId,
          _id: normalizedId,
        }
      : { ...prod };
  }, []);

  const recordVisit = useCallback(
    prod => {
      try {
        const normalized = normalizeProduct(prod);
        if (!normalized?.id) return;

        const key = 'visitedProducts';
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        const stored = Array.isArray(parsed) ? parsed : [];
        const filtered = stored.filter(item => item.id !== normalized.id);
        const next = [
          ...filtered,
          {
            id: normalized.id,
            name: normalized.name,
            image: normalized.image,
            price: normalized.price,
            visitedAt: Date.now(),
          },
        ].slice(-12);
        localStorage.setItem(key, JSON.stringify(next));
      } catch (storageError) {
        console.warn('Unable to track visited product', storageError);
      }
    },
    [normalizeProduct]
  );

  const fetchRecommended = useCallback(async () => {
    setRecLoading(true);
    setSimilarError(false);
    try {
      const { data: recs } = await withRetry(() => apiClient.get(`products/${id}/similar`));
      if (!Array.isArray(recs)) {
        setRecommended([]);
        return;
      }
      const normalized = recs
        .map(item => normalizeProduct(item))
        .filter(Boolean)
        .filter((item, index, self) => item.id && self.findIndex(other => other.id === item.id) === index)
        .filter(item => item.id !== `${id}`);
      setRecommended(normalized);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setSimilarError(true);
      setRecommended([]);
    } finally {
      setRecLoading(false);
    }
  }, [id, normalizeProduct]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await withRetry(() => apiClient.get(`products/${id}`));
      const normalized = normalizeProduct(data);
      if (!normalized?.id) {
        throw new Error('Product not found');
      }
      setProduct(normalized);
      setUserRating(normalized.rating || 0);
      recordVisit(normalized);
      fetchRecommended();
    } catch (err) {
      console.error('Error fetching product details:', err);
      setProduct(null);
      setError(err);
      if (err?.response?.status === 404) {
        try {
          const key = 'visitedProducts';
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              const filtered = parsed.filter(item => item?.id !== id);
              localStorage.setItem(key, JSON.stringify(filtered));
            }
          }
        } catch (storageError) {
          console.warn('Unable to prune visitedProducts cache', storageError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [fetchRecommended, id, normalizeProduct, recordVisit]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const formatCategory = value => {
    if (typeof value !== 'string' || !value.length) {
      return 'Sem categoria';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product);
    }
  }, [addToCart, product]);

  const handleRatingChange = async (_e, newRating) => {
    setUserRating(newRating);
    try {
      await apiClient.put(`products/${id}/rating`, { rating: newRating });
      setProduct(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          rating: newRating,
          numReviews: (prev.numReviews || 0) + 1,
        };
      });
      notify({ severity: 'success', message: 'Obrigado pela sua avaliação!' });
    } catch (err) {
      console.error('Error updating rating:', err);
      notify({ severity: 'error', message: 'Não foi possível atualizar sua avaliação no momento.' });
    }
  };

  // Função para formatar os nomes das especificações
  const formatSpecKey = (key) => {
    const map = {
      display: '📺 Ecrã / Display',
      processor: '⚡ Processador',
      ram: '💾 Memória RAM',
      storage: '💽 Armazenamento',
      camera: '📷 Câmara',
      frontCamera: '🤳 Câmara Frontal',
      battery: '🔋 Bateria',
      os: '📱 Sistema Operacional',
      waterproof: '💧 Resistência à Água',
      weight: '⚖️ Peso',
      connectivity: '🌐 Conectividade',
      security: '🔒 Segurança',
      colors: '🎨 Cores',
      inBox: '📦 Conteúdo da Caixa',
      type: '🎧 Tipo',
      noiseCancelling: '🔇 Cancelamento de Ruído',
      charging: '⚡ Carregamento',
      codecs: '🎵 Codecs',
      driverSize: '🔊 Tamanho do Driver',
      features: '✨ Funcionalidades',
      size: '📐 Tamanho',
      resolution: '📺 Resolução',
      technology: '🔬 Tecnologia',
      refreshRate: '🔄 Taxa de Atualização',
      hdr: '🌈 HDR',
      gaming: '🎮 Funcionalidades Gaming',
      ports: '🔌 Portas',
      audio: '🔊 Áudio',
      sensor: '📷 Sensor',
      video: '🎥 Vídeo',
      autofocus: '🎯 Autofoco',
      stabilization: '📷 Estabilização',
      iso: '🌙 ISO',
      burst: '📸 Disparos por Segundo',
      screen: '📱 Ecrã',
      sPen: '✏️ S Pen',
      ipRating: '💧 Classificação IP',
      innerDisplay: '📱 Ecrã Interno',
      outerDisplay: '📱 Ecrã Externo'
    };
    return map[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const formatSpecValue = (value) => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.join(', ');
      return JSON.stringify(value);
    }
    return value;
  };

  // Função para formatar a descrição com quebras de linha
  const renderDescription = (text) => {
    if (!text) return null;
    
    // Divide o texto por linhas
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Linha vazia
      if (line.trim() === '') {
        return <Box key={index} sx={{ height: 8 }} />;
      }
      // Linha de separador
      if (line.includes('━━━━')) {
        return (
          <Box key={index} sx={{ my: 1 }}>
            <hr style={{ border: '1px solid #e0e0e0' }} />
          </Box>
        );
      }
      // Títulos principais (com emoji)
      if (line.includes('📦') || line.includes('💎') || line.includes('⚙️') || line.includes('🎯') || line.includes('💰')) {
        return (
          <Typography key={index} sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'primary.main', fontSize: '1.1rem' }}>
            {line}
          </Typography>
        );
      }
      // Linha normal
      return (
        <Typography key={index} variant="body2" sx={{ mb: 0.5, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {line}
        </Typography>
      );
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom>
            Não foi possível carregar este produto.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            O produto pode ter sido removido ou está temporariamente indisponível. Atualize a página ou explore os produtos mais recentes.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" onClick={fetchProduct} startIcon={<RefreshIcon />}>
              Tentar novamente
            </Button>
            <Button variant="outlined" onClick={() => navigate('/shop')}>
              Voltar à loja
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Marca: {product.brand || 'MS Tech Eletronic'}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Categoria: {formatCategory(product.category)}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price.toLocaleString()} MZN
            </Typography>
            
            {/* ========== DESCRIÇÃO FORMATADA COM QUEBRAS DE LINHA ========== */}
            <Box sx={{ 
              mt: 2, 
              mb: 3,
              backgroundColor: '#f9f9f9',
              padding: 2,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {renderDescription(product.description)}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Em estoque:
              </Typography>
              <Chip
                label={product.stock > 0 ? `${product.stock} disponíveis` : 'Fora de estoque'}
                color={product.stock > 0 ? 'success' : 'error'}
                sx={{ maxWidth: '200px' }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
              <Rating value={userRating} precision={0.5} onChange={handleRatingChange} sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                ({product.numReviews || 0} avaliações)
              </Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 2 }}>
              Adicionar ao Carrinho
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ========== ESPECIFICAÇÕES TÉCNICAS ========== */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            📋 Especificações Técnicas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Todas as informações detalhadas do produto
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  borderBottom: '1px solid', 
                  borderColor: 'divider', 
                  py: 1.5,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ minWidth: '140px' }}>
                    {formatSpecKey(key)}:
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'right', flex: 1, wordBreak: 'break-word' }}>
                    {formatSpecValue(value)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          🎯 Recomendados para você
        </Typography>

        {recLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress size={32} />
          </Box>
        ) : recommended.length === 0 ? (
          similarError ? (
            <SimilarProductsError onRetry={fetchRecommended} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Estamos preparando recomendações para este produto. Volte em breve para mais sugestões.
            </Typography>
          )
        ) : (
          <Grid container spacing={3}>
            {recommended.map(rec => (
              <Grid item xs={12} sm={6} md={4} key={rec.id}>
                <Card elevation={4} sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                  <CardActionArea onClick={() => navigate(`/product/${rec.id}`)}>
                    <CardMedia component="img" height="160" image={rec.image} alt={rec.name} sx={{ objectFit: 'contain', p: 2 }} />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom noWrap sx={{ fontWeight: 600 }}>
                        {rec.name}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {rec.price.toLocaleString()} MZN
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default ProductDetails;