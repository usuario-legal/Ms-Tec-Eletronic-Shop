import * as React from 'react';
import { Container, Typography, Grid, Paper, Stack, Chip, Avatar, Divider, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BuildIcon from '@mui/icons-material/Build';

const milestones = [
  {
    year: '2020',
    title: 'Início',
    description: 'Criação da MS Tech Eletronic com foco em serviços técnicos e soluções tecnológicas acessíveis.',
  },
  {
    year: '2022',
    title: 'Expansão',
    description: 'Introdução da venda de equipamentos eletrónicos e ampliação dos serviços.',
  },
  {
    year: '2024',
    title: 'Crescimento',
    description: 'Conquista de clientes e fortalecimento da marca no mercado.',
  },
  {
    year: '2026',
    title: 'Atualidade',
    description: 'Consolidação como uma empresa em desenvolvimento, focada em inovação e qualidade.',
  },
];

const pillars = [
  {
    icon: <EmojiObjectsIcon fontSize="large" />,
    title: 'Tecnologia Inteligente e Selecionada',
    description: 'Selecionamos cuidadosamente cada produto para garantir desempenho, durabilidade e valor real para os nossos clientes.',
  },
  {
    icon: <BuildIcon fontSize="large" />,
    title: 'Serviços Técnicos Profissionais',
    description: 'Oferecemos manutenção de computadores, instalação de sistemas, redes e suporte técnico com rapidez e eficiência.',
  },
  {
    icon: <FavoriteBorderIcon fontSize="large" />,
    title: 'Experiência do Cliente',
    description: 'Valorizamos cada cliente, garantindo atendimento personalizado, suporte contínuo e confiança em cada serviço.',
  },
  {
    icon: <RocketLaunchIcon fontSize="large" />,
    title: 'Visão Orientada ao Futuro',
    description: 'Acompanhamos as tendências tecnológicas para trazer inovação e soluções modernas ao mercado moçambicano.',
  },
];

function About() {
  return (
    <Container maxWidth="lg" sx={{ pb: 10 }}>
      <Stack spacing={3} sx={{ textAlign: 'center', mt: 6, mb: 6 }} alignItems="center">
        <Chip label="Sobre a MS Tech" color="primary" variant="outlined" sx={{ alignSelf: 'center' }} />
        <Typography variant="h3" fontWeight={800}>
          Levamos tecnologia e soluções ao próximo nível.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mx: 'auto', lineHeight: 1.9, textAlign: 'center' }}>
          A MS Tech Eletronic é uma empresa moçambicana especializada na venda de equipamentos eletrónicos e prestação de serviços técnicos profissionais. 
          Trabalhamos com foco em qualidade, inovação e eficiência, oferecendo soluções completas para empresas e particulares que procuram tecnologia 
          confiável e suporte especializado.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {pillars.map(pillar => (
          <Grid item xs={12} md={6} key={pillar.title}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{pillar.icon}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {pillar.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pillar.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight={700}>
          Nossa Trajetória
        </Typography>
        <Typography variant="body1" color="text.secondary">
          De uma ideia simples a uma empresa em crescimento, construímos nossa reputação com base em trabalho, confiança e resultados.
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ mt: 3, p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {milestones.map(step => (
            <Grid item xs={12} sm={6} key={step.year}>
              <Stack spacing={1.5}>
                <Chip label={step.year} color="primary" sx={{ alignSelf: 'flex-start' }} />
                <Typography variant="h6" fontWeight={700}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ mt: 8, p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              A equipa por trás da MS Tech
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 720, mx: 'auto' }}>
              Contamos com profissionais especializados em informática, eletrónica e suporte técnico, preparados para oferecer soluções eficientes 
              e rápidas. Trabalhamos com dedicação para garantir que cada cliente tenha a melhor experiência possível com tecnologia.
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
              <Box textAlign="center" sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>
                  Múltiplas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Especialistas em múltiplas áreas
                </Typography>
              </Box>
              <Box textAlign="center" sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>
                  Alta
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Alta satisfação dos clientes
                </Typography>
              </Box>
              <Box textAlign="center" sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>
                  Diversificadas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Serviços e soluções diversificadas
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                O que acreditamos
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                • A tecnologia deve ser acessível, útil e confiável
                <br />
                • A transparência e o profissionalismo são essenciais
                <br />
                • O cliente está sempre no centro das nossas decisões
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default About;