import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Grid, Paper, Stack, Chip, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import { useNotifier } from '../context/NotificationProvider';

function Support() {
  const [form, setForm] = React.useState({ name: '', email: '', topic: '', message: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const { notify } = useNotifier();
  const location = useLocation();

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const topic = form.topic.trim();
    const message = form.message.trim();

    if (!name || !email || !topic || !message) {
      notify({ severity: 'warning', message: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailPattern.test(email)) {
      notify({ severity: 'warning', message: 'Digite um endereço de email válido.' });
      return;
    }

    setSubmitting(true);
    notify({ severity: 'info', message: 'A enviar mensagem…', autoHideDuration: 2200 });

    try {
      const response = await fetch('https://formspree.io/f/xqenlved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `MS Tech Support: ${topic}`,
          message: message,
          _replyto: email,
        })
      });

      if (response.ok) {
        notify({ severity: 'success', message: 'Mensagem enviada com sucesso! Responderemos em até 24 horas.' });
        setForm({ name: '', email: '', topic: '', message: '' });
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      notify({ severity: 'error', message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    const { hash } = location;
    if (!hash || hash === '#faq') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = hash.replace('#', '');
    const scrollToSection = () => {
      const node = document.getElementById(targetId);
      if (node) {
        const offset = 96;
        const nodeTop = node.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: nodeTop, behavior: 'smooth' });
      }
    };

    const timeout = window.setTimeout(scrollToSection, 120);
    return () => window.clearTimeout(timeout);
  }, [location]);

  // Lista de províncias
  const provinces = ['Maputo', 'Beira', 'Matola', 'Nampula', 'Chimoio', 'Quelimane'];

  return (
    <Container maxWidth="xl" sx={{ pb: 8 }}>
      {/* Cabeçalho */}
      <Stack spacing={1} sx={{ textAlign: 'center', mt: 4, mb: 5 }} alignItems="center">
        <Chip label="MS Tech Electronic" color="primary" variant="outlined" sx={{ alignSelf: 'center' }} />
        <Typography variant="h4" fontWeight={700}>
          Suporte MS Tech Electronic
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
          Atendimento que realmente ajuda.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', mt: 1 }}>
          Seja para acompanhar uma encomenda, pedir suporte técnico ou receber ajuda na escolha do equipamento ideal, a equipa da MS Tech Electronic está pronta para atender você com rapidez e profissionalismo.
        </Typography>
      </Stack>

      {/* 4 Cards em linha - todos com altura igual */}
      <Grid container spacing={3} id="support-cards">
        {/* Linha de Atendimento Direta */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, height: '100%', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <PhoneForwardedIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Linha de Atendimento Direta
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', flex: 1 }}>
                Fale rapidamente com nossa equipa através de chamada telefônica para suporte, dúvidas ou acompanhamento de pedidos.
              </Typography>
              <Button 
                component="a"
                href="https://wa.me/258865290079"
                target="_blank"
                variant="contained" 
                startIcon={<PhoneForwardedIcon />}
                size="small"
                fullWidth
                sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
              >
                Chamada direta
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Atendimento via WhatsApp */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, height: '100%', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <WhatsAppIcon sx={{ fontSize: 28, color: '#25D366' }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Atendimento via WhatsApp
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', flex: 1 }}>
                Suporte técnico, orçamentos, acompanhamento de encomendas, assistência informática, configuração de equipamentos, automação com Alexa e Arduino.
              </Typography>
              <Button 
                component="a"
                href="https://wa.me/258865290079"
                target="_blank"
                variant="contained" 
                startIcon={<WhatsAppIcon />}
                size="small"
                fullWidth
                sx={{ mt: 1, textTransform: 'none', bgcolor: '#25D366', '&:hover': { bgcolor: '#1da851' }, borderRadius: 2 }}
              >
                Chat direto no WhatsApp
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Entregas e Rastreamento */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, height: '100%', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Entregas e Rastreamento
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', flex: 1 }}>
                Acompanhe suas encomendas em tempo real. Realizamos entregas em várias províncias de Moçambique.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {provinces.map(province => (
                  <Chip key={province} label={province} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                + outras regiões sob consulta
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* Privacidade e Segurança */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, height: '100%', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <ShieldIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Privacidade e Segurança
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem', flex: 1 }}>
                A MS Tech Electronic protege totalmente os seus dados pessoais. As suas informações nunca são vendidas ou compartilhadas sem autorização.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem', mt: 0.5 }}>
                Utilizamos sistemas seguros para proteger pagamentos, contas e dados dos clientes.
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Stack spacing={2} sx={{ mt: 6, mb: 3 }} id="faq">
        <Typography variant="h5" fontWeight={700}>
          Perguntas Frequentes (FAQ)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Respostas rápidas para as dúvidas mais comuns.
        </Typography>
      </Stack>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Com quanto tempo os pedidos são enviados?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Pedidos confirmados durante o horário comercial normalmente são preparados no mesmo dia. O prazo de entrega varia conforme a localização do cliente.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Qual é a política de devolução?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Aceitamos devoluções dentro do prazo estabelecido para produtos com defeito ou problemas técnicos, respeitando as condições da garantia.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Os produtos possuem garantia?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Sim. A maioria dos produtos possui garantia do fabricante. Equipamentos vendidos pela MS Tech Electronic também podem incluir garantia adicional dependendo da categoria.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Posso receber ajuda antes de comprar?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Sim. Nossa equipa pode ajudar na escolha de: Computadores, Peças gamer, Redes, Sistemas de segurança, Automação residencial, Equipamentos eletrônicos.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Vocês fazem instalação e configuração?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Sim. Oferecemos: Instalação de software, Configuração de redes, Montagem de PCs, Automação com Alexa, Automação com Arduino, Instalação de câmeras, Configuração de smart devices.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>É possível pagar parcelado?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Dependendo do produto e do método de pagamento disponível, algumas compras podem ser negociadas em parcelas.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, mb: 1, border: '1px solid #e0e0e0', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Como acompanho meu suporte técnico?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Cada atendimento recebe atualização através de contacto direto com o cliente por chamada, WhatsApp ou email.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Formulário de Contacto */}
      <Paper elevation={3} sx={{ mt: 6, p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: '#f8fafc' }} id="contact">
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Envie sua Mensagem
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Preencha seus dados e descreva o problema ou pedido de suporte.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Chip label="Suporte técnico" size="small" variant="outlined" />
          <Chip label="Informações sobre encomendas" size="small" variant="outlined" />
          <Chip label="Assistência para computadores" size="small" variant="outlined" />
          <Chip label="Instalação de software" size="small" variant="outlined" />
          <Chip label="Automação residencial" size="small" variant="outlined" />
          <Chip label="Redes e internet" size="small" variant="outlined" />
          <Chip label="Montagem gamer" size="small" variant="outlined" />
          <Chip label="Orçamentos personalizados" size="small" variant="outlined" />
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome completo *"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Assunto *"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Ex: Suporte técnico, Informação sobre encomendas, Orçamento"
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensagem *"
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={5}
                fullWidth
                required
                variant="outlined"
                placeholder="Descreva detalhadamente o seu problema ou dúvida..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              startIcon={!submitting && <SendIcon />}
              sx={{ minWidth: { xs: '100%', md: 'auto' }, px: 4, py: 1, borderRadius: 2, textTransform: 'none' }}
            >
              {submitting ? 'A enviar...' : 'Enviar Mensagem'}
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 2 }}>
            Após o envio, a equipa da MS Tech Electronic responderá o mais rápido possível.
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default Support;