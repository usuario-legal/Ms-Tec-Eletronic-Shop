import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import { useNotifier } from '../context/NotificationProvider';

// Zonas de entrega (Beira)
const zonas = [
  'Macuti', 'Chipangara', 'Ponta-Gêa', 'Chaimite', 'Pioneiros', 'Esturro',
  'Matacuane', 'Macurungo', 'Chota', 'Mananga', 'Maraza', 'Munhava Central',
  'Vaz', 'Alto da Manga', 'Chingussura', 'Inhamizua', 'Matadouro', 'Nhaconjo',
  'Vila Massane', 'Manga Mascarenhas', 'Muave', 'Mungassa', 'Ndunda',
  'Nhangau', 'Nhangoma', 'Tchonja'
];

// Opções de pagamento
const pagamentos = [
  { 
    value: 'emola', 
    label: 'e-Mola',
    numero: '865290079',
    nome: 'MS Tech Eletronic'
  },
  { 
    value: 'mpesa', 
    label: 'M-Pesa',
    numero: '843294779',
    nome: 'Mateus dos Santos Barros Feniasse Saize'
  },
];

function CheckoutForm({ cart, totalPrice, clearCart, onOrderComplete }) {
  const { notify } = useNotifier();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: dados, 2: pagamento, 3: finalizar

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
  const [transferenciaConfirmada, setTransferenciaConfirmada] = useState(false);

  const frete = 100;
  const totalFinal = totalPrice + frete;

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const validarDados = () => {
    if (!cliente.nome) {
      notify({ severity: 'warning', message: 'Digite seu nome completo!' });
      return false;
    }
    if (!cliente.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
      notify({ severity: 'warning', message: 'Digite um email válido!' });
      return false;
    }
    if (!cliente.contacto || cliente.contacto.length < 9) {
      notify({ severity: 'warning', message: 'Digite um número de contacto válido!' });
      return false;
    }
    if (!cliente.zona) {
      notify({ severity: 'warning', message: 'Selecione a sua zona!' });
      return false;
    }
    if (!cliente.endereco) {
      notify({ severity: 'warning', message: 'Digite o endereço completo!' });
      return false;
    }
    return true;
  };

  const handleContinuarPagamento = () => {
    if (validarDados()) {
      setStep(2);
    }
  };

  const handleConfirmarTransferencia = () => {
    if (!comprovativo) {
      notify({ severity: 'warning', message: 'Digite o número do comprovativo!' });
      return;
    }
    setTransferenciaConfirmada(true);
    notify({ severity: 'success', message: 'Transferência confirmada! Clique em Finalizar Compra.' });
  };

  const enviarParaWhatsApp = () => {
    const pagamentoSelecionado = pagamentos.find(p => p.value === pagamento);
    
    // Formatar produtos
    let produtosTexto = '';
    cart.forEach(item => {
      produtosTexto += `• ${item.name}: ${item.price.toLocaleString()} MZN\n`;
    });

    // Criar mensagem para WhatsApp
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
• Subtotal: ${totalPrice.toLocaleString()} MZN
• Frete: ${frete} MZN
• TOTAL: ${totalFinal.toLocaleString()} MZN

━━━━━━━━━━━━━━━━━━━━━
💳 *PAGAMENTO*
• Método: ${pagamentoSelecionado?.label}
• Comprovativo: ${comprovativo}
• Nº Transferência: ${pagamentoSelecionado?.numero}

━━━━━━━━━━━━━━━━━━━━━
📅 Data: ${new Date().toLocaleString('pt-MZ')}`;

    // Enviar para o WhatsApp (número do dono da loja)
    const numeroWhatsApp = '258840000000'; // ALTERE PARA SEU NÚMERO!
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    return mensagem;
  };

  const handleFinalizar = async () => {
    if (!transferenciaConfirmada) {
      notify({ severity: 'warning', message: 'Confirme que já fez a transferência!' });
      return;
    }

    setLoading(true);
    
    try {
      // Enviar para WhatsApp
      enviarParaWhatsApp();
      
      // Limpar carrinho
      if (clearCart) {
        clearCart();
      }
      
      // Notificar sucesso
      notify({ 
        severity: 'success', 
        message: 'Pedido finalizado! Entraremos em contacto em breve para confirmar sua encomenda.' 
      });
      
      // Avançar para passo 3
      setStep(3);
      
      if (onOrderComplete) {
        onOrderComplete();
      }
      
    } catch (error) {
      notify({ severity: 'error', message: 'Erro ao finalizar pedido. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    setStep(1);
    setTransferenciaConfirmada(false);
    setComprovativo('');
  };

  // Passo 1: Dados do Cliente
  if (step === 1) {
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Finalizar Compra - MS Tech Eletronic
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Preencha seus dados para continuar
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6">Subtotal: {totalPrice.toLocaleString()} MZN</Typography>
            <Typography variant="h6" color="primary">Frete: {frete} MZN</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
              TOTAL: {totalFinal.toLocaleString()} MZN
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinuarPagamento}
            sx={{ px: 6, py: 1.5 }}
          >
            Continuar para Pagamento
          </Button>
        </Box>
      </Paper>
    );
  }

  // Passo 2: Pagamento
  if (step === 2) {
    const pagamentoSelecionado = pagamentos.find(p => p.value === pagamento);
    
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Pagamento - MS Tech Eletronic
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Resumo do Pedido</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
              {cart.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price.toLocaleString()} MZN</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Subtotal</Typography>
                <Typography>{totalPrice.toLocaleString()} MZN</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Frete</Typography>
                <Typography>{frete} MZN</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">TOTAL</Typography>
                <Typography variant="h6" color="primary">{totalFinal.toLocaleString()} MZN</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Escolha o Método de Pagamento</Typography>
            
            <RadioGroup value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
              {pagamentos.map((p) => (
                <Paper key={p.value} sx={{ p: 2, mb: 2, border: pagamento === p.value ? '2px solid #1976d2' : '1px solid #ddd' }}>
                  <FormControlLabel
                    value={p.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">{p.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Enviar para: {p.numero} - {p.nome}
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              ))}
            </RadioGroup>

            {pagamentoSelecionado && (
              <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  ⚠️ Faça a transferência para:
                </Typography>
                <Typography variant="body2">
                  {pagamentoSelecionado.label}: <strong>{pagamentoSelecionado.numero}</strong><br />
                  Nome: <strong>{pagamentoSelecionado.nome}</strong><br />
                  Valor: <strong>{totalFinal.toLocaleString()} MZN</strong>
                </Typography>
              </Alert>
            )}

            <TextField
              fullWidth
              label="Nº do Comprovativo / Referência"
              value={comprovativo}
              onChange={(e) => setComprovativo(e.target.value)}
              variant="outlined"
              sx={{ mt: 2 }}
              placeholder="Digite o código de confirmação da transferência"
            />

            {!transferenciaConfirmada && (
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleConfirmarTransferencia}
              >
                ✅ Confirmar Transferência
              </Button>
            )}

            {transferenciaConfirmada && (
              <Alert severity="success" sx={{ mt: 2 }}>
                ✅ Transferência confirmada! Clique em Finalizar.
              </Alert>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button variant="outlined" onClick={handleVoltar}>
            ← Voltar
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleFinalizar}
            disabled={!transferenciaConfirmada || loading}
            sx={{ px: 6, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : '✅ Finalizar Compra'}
          </Button>
        </Box>
      </Paper>
    );
  }

  // Passo 3: Sucesso
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ color: 'green', mb: 2 }}>✅</Typography>
      <Typography variant="h4" gutterBottom sx={{ color: 'success.main' }}>
        Pedido Finalizado!
      </Typography>
      <Typography variant="body1" paragraph>
        Obrigado por comprar na <strong>MS Tech Eletronic</strong>!
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Seus dados foram enviados para nossa equipa. Entraremos em contacto em breve via WhatsApp para confirmar sua encomenda e dar início à entrega.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => window.location.href = '/shop'}
        sx={{ mt: 2 }}
      >
        Continuar Comprando
      </Button>
    </Paper>
  );
}

export default CheckoutForm;