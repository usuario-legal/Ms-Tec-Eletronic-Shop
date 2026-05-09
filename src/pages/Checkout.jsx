import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Divider,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LockIcon from '@mui/icons-material/Lock';
import { useNotifier } from '../context/NotificationProvider';

// Zonas de entrega (Beira)
const zonas = [
  'Macuti', 'Chipangara', 'Ponta-Gêa', 'Chaimite', 'Pioneiros', 'Esturro',
  'Matacuane', 'Macurungo', 'Chota', 'Mananga', 'Maraza', 'Munhava Central',
  'Vaz', 'Alto da Manga', 'Chingussura', 'Inhamizua', 'Matadouro', 'Nhaconjo',
  'Vila Massane', 'Manga Mascarenhas', 'Muave', 'Mungassa', 'Ndunda',
  'Nhangau', 'Nhangoma', 'Tchonja'
];

// Opções de pagamento - MESMO NOME para ambos
const pagamentos = [
  { 
    value: 'emola', 
    label: 'e-Mola',
    numero: '865290079',
    nome: 'Mateus dos Santos Barros Feniasse Saize'
  },
  { 
    value: 'mpesa', 
    label: 'M-Pesa',
    numero: '843294779',
    nome: 'Mateus dos Santos Barros Feniasse Saize'
  },
];

function Checkout({ cartItems = [], onOrderComplete, clearCart }) {
  const navigate = useNavigate();
  const { notify } = useNotifier();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  // Dados do cliente
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    contacto: '',
    zona: '',
    endereco: '',
  });

  // Pagamento
  const [pagamento, setPagamento] = useState('emola');
  const [comprovativo, setComprovativo] = useState('');

  const frete = 100;
  const totalProdutos = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalFinal = totalProdutos + frete;

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const enviarWhatsApp = () => {
    const pagamentoSelecionado = pagamentos.find(p => p.value === pagamento);
    
    let produtosTexto = '';
    cartItems.forEach(item => {
      produtosTexto += `• ${item.name}: ${(item.price || 0).toLocaleString()} MZN\n`;
    });

    const mensagem = `🛍️ *NOVA COMPRA - MS TECH ELETRONIC*
━━━━━━━━━━━━━━━━━━━━━

📋 *DADOS DO CLIENTE*
• Nome: ${cliente.nome}
• Email: ${cliente.email}
• Contacto: ${cliente.contacto}
• Zona: ${cliente.zona}
• Endereço: ${cliente.endereco}

━━━━━━━━━━━━━━━━━━━━━
🛒 *PRODUTOS*
${produtosTexto}
━━━━━━━━━━━━━━━━━━━━━
💰 *RESUMO DO PEDIDO*
• Subtotal: ${totalProdutos.toLocaleString()} MZN
• Frete: ${frete} MZN
• TOTAL: ${totalFinal.toLocaleString()} MZN

━━━━━━━━━━━━━━━━━━━━━
💳 *PAGAMENTO*
• Método: ${pagamentoSelecionado?.label}
• ID da Transação/Comprovativo: ${comprovativo}
• Enviado para: ${pagamentoSelecionado?.numero}
• Nome: ${pagamentoSelecionado?.nome}

━━━━━━━━━━━━━━━━━━━━━
📅 Data: ${new Date().toLocaleString('pt-MZ')}`;

    const numeroWhatsApp = '258865290079';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Redirecionar para o WhatsApp
    window.location.href = urlWhatsApp;
  };

  const handleFinalizar = () => {
    // Validações
    if (!cliente.nome) {
      notify({ severity: 'warning', message: 'Digite seu nome completo!' });
      return;
    }
    if (!cliente.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
      notify({ severity: 'warning', message: 'Digite um email válido!' });
      return;
    }
    if (!cliente.contacto || cliente.contacto.length < 9) {
      notify({ severity: 'warning', message: 'Digite um número de contacto válido!' });
      return;
    }
    if (!cliente.zona) {
      notify({ severity: 'warning', message: 'Selecione a sua zona!' });
      return;
    }
    if (!cliente.endereco) {
      notify({ severity: 'warning', message: 'Digite o endereço completo!' });
      return;
    }
    if (!comprovativo) {
      notify({ severity: 'warning', message: 'Digite o ID da transação/comprovativo!' });
      return;
    }

    setLoading(true);
    
    try {
      // Limpar carrinho
      if (clearCart) {
        clearCart();
      }
      
      // Salvar pedido no localStorage
      const pedido = {
        cliente,
        pagamento,
        comprovativo,
        total: totalFinal,
        produtos: cartItems,
        data: new Date().toISOString()
      };
      localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
      
      // Notificar sucesso
      notify({ 
        severity: 'success', 
        message: '✅ Pedido registrado! Redirecionando para o WhatsApp...' 
      });
      
      setOrderCreated(true);
      
      if (onOrderComplete) {
        onOrderComplete();
      }
      
      // Enviar mensagem e redirecionar para WhatsApp
      setTimeout(() => {
        enviarWhatsApp();
      }, 1000);
      
    } catch (error) {
      notify({ severity: 'error', message: 'Erro ao finalizar pedido. Tente novamente.' });
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  if (cartItems.length === 0 && !orderCreated) {
    return (
      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, textAlign: 'center' }}>
          <ShoppingCartCheckoutIcon color="primary" fontSize="large" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Carrinho Vazio
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Você ainda não adicionou nenhum produto ao carrinho.
          </Typography>
          <Button variant="contained" onClick={handleContinueShopping}>
            Continuar Comprando
          </Button>
        </Paper>
      </Container>
    );
  }

  if (orderCreated) {
    return (
      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'green', mb: 2 }}>✅</Typography>
          <Typography variant="h4" gutterBottom sx={{ color: 'success.main' }}>
            Pedido Registrado!
          </Typography>
          <Typography variant="body1" paragraph>
            Obrigado por comprar na <strong>MS Tech Eletronic</strong>!
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Você será redirecionado para o WhatsApp para enviar o comprovativo.<br />
            Após o envio, entraremos em contacto para confirmar sua encomenda.
          </Typography>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 10 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <ShoppingCartCheckoutIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h4" gutterBottom>
              Finalizar Compra - MS Tech Eletronic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Você tem {cartItems.length} produto(s) no carrinho. Subtotal: {totalProdutos.toLocaleString()} MZN + frete
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          📋 Seus Dados
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Nome Completo"
              name="nome"
              value={cliente.nome}
              onChange={handleClienteChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={cliente.email}
              onChange={handleClienteChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Contacto (WhatsApp/Telefone)"
              name="contacto"
              value={cliente.contacto}
              onChange={handleClienteChange}
              variant="outlined"
              placeholder="84XXXXXXX"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Selecione sua Zona</InputLabel>
              <Select
                name="zona"
                value={cliente.zona}
                onChange={handleClienteChange}
                label="Selecione sua Zona"
              >
                {zonas.map((zona) => (
                  <MenuItem key={zona} value={zona}>{zona}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Endereço Completo (Rua, Nº, Referência)"
              name="endereco"
              value={cliente.endereco}
              onChange={handleClienteChange}
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          💳 Pagamento
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup value={pagamento} onChange={(e) => setPagamento(e.target.value)} row>
              {pagamentos.map((p) => (
                <FormControlLabel
                  key={p.value}
                  value={p.value}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{p.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Enviar para: {p.numero}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                ⚠️ Faça a transferência para o número selecionado:
              </Typography>
              <Typography variant="body2">
                Valor: <strong>{totalFinal.toLocaleString()} MZN</strong><br />
                Nome: <strong>Mateus dos Santos Barros Feniasse Saize</strong><br />
                Após a transferência, cole abaixo o <strong>ID da Transação</strong> ou <strong>Nº do Comprovativo</strong>.
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="ID da Transação / Nº do Comprovativo"
              value={comprovativo}
              onChange={(e) => setComprovativo(e.target.value)}
              variant="outlined"
              placeholder="Cole aqui o código de confirmação da transferência"
              helperText="Copie e cole o ID da transação que apareceu após fazer o pagamento"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6">Subtotal: {totalProdutos.toLocaleString()} MZN</Typography>
            <Typography variant="h6" color="primary">Frete: {frete} MZN</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
              TOTAL: {totalFinal.toLocaleString()} MZN
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleFinalizar}
            disabled={loading}
            sx={{ px: 6, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : '✅ Finalizar Compra'}
          </Button>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 4, pt: 2, color: 'text.secondary' }}>
          <LockIcon fontSize="small" />
          <Typography variant="caption">
            Ao finalizar, você será redirecionado ao WhatsApp para enviar o comprovativo.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Checkout;