import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ServicesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom fontWeight={700}>
        🛠️ Serviços MS Tech
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Página de serviços em desenvolvimento.
      </Typography>
      <Typography variant="body1" paragraph>
        Em breve todos os serviços estarão disponíveis.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Voltar para Home
      </Button>
    </Container>
  );
}

export default ServicesPage;