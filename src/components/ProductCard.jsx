import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const canonicalId = product?._id || product?.id;
  const formattedCategory = product?.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : null;
  const ratingValue = typeof product?.rating === 'number' ? product.rating : null;
  const reviewCount = typeof product?.numReviews === 'number' ? product.numReviews : null;
  const displayImage = Array.isArray(product?.image) ? product.image[0] : product?.image;

  const handleViewDetails = () => {
    if (!canonicalId) return;
    navigate(`/product/${canonicalId}`);
  };

  const handleCardClick = event => {
    if (!canonicalId) return;
    const button = event.target.closest('button');
    if (button) return;
    handleViewDetails();
  };

  const getStockText = () => {
    if (product.stock > 5) return `${product.stock} em stock`;
    if (product.stock > 0) return 'Stock limitado disponível';
    return 'Esgotado';
  };

  const getStockColor = () => {
    if (product.stock > 5) return 'success.main';
    if (product.stock > 0) return 'warning.main';
    return 'error.main';
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 24px 38px rgba(15, 23, 42, 0.12)',
        },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
        <CardMedia
          component="img"
          alt={product.name}
          image={displayImage}
          loading="eager"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.04)',
            },
          }}
        />
        {formattedCategory && (
          <Chip
            size="small"
            label={formattedCategory}
            color="primary"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: 'rgba(40,116,240,0.92)',
              color: '#fff',
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, height: '2.4em', overflow: 'hidden' }}>
          {product.name}
        </Typography>
        
        {/* ========== DESCRIÇÃO CORRIGIDA ========== */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mt: 1
          }}
        >
          {product.description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            {product.price.toLocaleString()} MZN
          </Typography>
          {ratingValue !== null && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Rating name={`rating-${canonicalId}`} value={ratingValue} precision={0.5} readOnly size="small" />
              {reviewCount !== null && (
                <Typography variant="caption" color="text.secondary">
                  ({reviewCount})
                </Typography>
              )}
            </Stack>
          )}
        </Stack>

        {typeof product?.stock === 'number' && (
          <Typography variant="caption" color={getStockColor()} sx={{ mt: 1, display: 'block', fontWeight: 600 }}>
            {getStockText()}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2, pb: 2, mt: 'auto' }}>
        <Button
          size="small"
          variant="contained"
          onClick={event => {
            event.stopPropagation();
            addToCart(product);
          }}
          sx={{ borderRadius: '8px', textTransform: 'none' }}
        >
          Adicionar ao Carrinho
        </Button>
        <Tooltip title="Ver especificações" arrow>
          <Button
            size="small"
            color="inherit"
            onClick={event => {
              event.stopPropagation();
              handleViewDetails();
            }}
            sx={{ textTransform: 'none' }}
          >
            Ver Detalhes
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}