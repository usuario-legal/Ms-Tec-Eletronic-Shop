import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'green', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Pedido Confirmado!
      </Typography>
      <Typography variant="body1" paragraph>
        Obrigado por comprar na MS Tech Eletronic! Seu pedido está sendo processado.
      </Typography>
      <Typography variant="body2" paragraph color="text.secondary">
        Você receberá um email com os detalhes da sua encomenda em breve.
      </Typography>
      <Button variant="contained" onClick={handleContinueShopping}>
        Continuar Comprando
      </Button>
    </Box>
  );
}

export default OrderConfirmation;