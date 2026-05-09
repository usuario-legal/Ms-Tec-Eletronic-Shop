import * as React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Stack, TextField, IconButton, Divider, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import TikTokIcon from '@mui/icons-material/MusicNote';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import GavelIcon from '@mui/icons-material/Gavel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNotifier } from '../context/NotificationProvider';

const quickLinks = [
  { label: 'Início', to: '/' },
  { label: 'Loja', to: '/shop' },
  { label: 'Sobre', to: '/about' },
  { label: 'Suporte', to: '/support' },
  { label: 'Carrinho', to: '/cart' },
];

const helpLinks = [
  { label: 'Rastrear Encomenda', to: '/order-tracking' },
  { label: 'Envio e Devoluções', to: '/shipping-returns' },
  { label: 'Termos e Condições', to: '/terms' },
  { label: 'Política de Privacidade', to: '/privacy' },
  { label: 'FAQ', to: '/support#faq' },
  { label: 'Contacto', to: '/support#contact' },
];

const socialLinks = [
  { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com/profile.php?id=61574977827702' },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/258865290079' },
  { icon: <EmailIcon />, label: 'Email', href: 'mailto:mstecheletronic@gmail.com' },
  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://tiktok.com/@mstecheletronic' },
];

const policyLinks = [
  { label: 'Privacidade', to: '/privacy', icon: <PrivacyTipOutlinedIcon fontSize="small" /> },
  { label: 'Termos', to: '/terms', icon: <GavelIcon fontSize="small" /> },
  { label: 'Envio e Devoluções', to: '/shipping-returns', icon: <LocalShippingIcon fontSize="small" /> },
  { label: 'Rastrear Encomenda', to: '/order-tracking', icon: <LocationSearchingIcon fontSize="small" /> },
  { label: 'Contacto', to: '/support#contact', icon: <SupportAgentIcon fontSize="small" /> },
];

function Footer() {
  const [email, setEmail] = React.useState('');
  const { notify } = useNotifier();

  const handleSubmit = event => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      notify({ severity: 'warning', message: 'Digite seu email para receber novidades!' });
      return;
    }
    const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailPattern.test(trimmed)) {
      notify({ severity: 'warning', message: 'Digite um email válido.' });
      return;
    }

    notify({ severity: 'info', message: 'Adicionando você à lista VIP…', autoHideDuration: 2200 });
    notify({ severity: 'success', message: 'Bem-vindo(a)! Você receberá nossas ofertas exclusivas.' });
    setEmail('');
  };

  return (
    <Box component="footer" sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', mt: 8 }}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <StorefrontIcon sx={{ fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.12em', fontSize: '1.1rem' }}>
                MS TECH ELETRONIC
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(226,232,240,0.78)', fontSize: '0.8rem' }}>
              A sua loja de eletrónica e serviços técnicos em Moçambique. Equipamentos de qualidade, assistência profissional e soluções tecnológicas modernas para empresas e particulares.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {socialLinks.map(link => (
                <IconButton
                  key={link.label}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                  size="small"
                  aria-label={link.label}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    width: 32,
                    height: 32,
                    '& svg': { fontSize: '1.1rem' }
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
              Explorar
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map(link => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  color="inherit"
                  underline="none"
                  sx={{ color: 'rgba(226,232,240,0.78)', fontSize: '0.8rem', '&:hover': { color: '#fff' } }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
              Atendimento
            </Typography>
            <Stack spacing={1}>
              {helpLinks.map(link => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  color="inherit"
                  underline="none"
                  sx={{ color: 'rgba(226,232,240,0.78)', fontSize: '0.8rem', '&:hover': { color: '#fff' } }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
              Receba Ofertas Exclusivas
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(226,232,240,0.78)', mb: 2, fontSize: '0.75rem' }}>
              Cadastre-se e receba promoções, novidades e descontos especiais em primeira mão.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <TextField
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="seu@email.com"
                size="small"
                variant="outlined"
                sx={{ flexGrow: 1, minWidth: '200px', bgcolor: 'white', borderRadius: 1, '& input': { fontSize: '0.8rem', py: 0.8 } }}
              />
              <IconButton type="submit" color="primary" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#e2e8f0' }, width: 34, height: 34 }}>
                <SendIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
            <Chip label="Sem spam, prometemos!" size="small" sx={{ mt: 2, bgcolor: 'rgba(148, 163, 184, 0.12)', color: 'rgba(248, 250, 252, 0.8)', fontSize: '0.7rem', height: 24 }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(148,163,184,0.25)' }} />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(226,232,240,0.7)', fontSize: '0.7rem' }}>
            © {new Date().getFullYear()} MS Tech Eletronic - Todos os direitos reservados. Moçambique
          </Typography>
          <Stack direction="row" spacing={2} sx={{ color: 'rgba(226,232,240,0.7)' }}>
            {policyLinks.map(link => (
              <MuiLink key={link.to} component={RouterLink} to={link.to} color="inherit" underline="none" sx={{ fontSize: '0.7rem' }}>
                {link.label}
              </MuiLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;