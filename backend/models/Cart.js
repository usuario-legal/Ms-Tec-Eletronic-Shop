import React from 'react';
import { Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Typography, Divider, Paper, Stack, Box, Chip, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useNotifier } from '../context/NotificationProvider';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { notify } = useNotifier();
  const { cart, updateQuantity, removeItem, loading } = useCart();

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    notify({ severity: 'info', message: 'Item removido do carrinho.' });
  };

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!cart.items || cart.items.length === 0) {
      notify({ severity: 'warning', message: 'Adicione itens antes de finalizar.' });
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Carregando carrinho...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Meu Carrinho
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')}>
            Continuar comprando
          </Button>
          <Chip icon={<ShoppingBagIcon />} label={`${cart.totalItems || 0} itens`} color="primary" variant="outlined" />
        </Stack>
      </Stack>

      {!cart.items || cart.items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Seu carrinho está vazio.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Comece a explorar nossos produtos.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/shop')}>
            Ver produtos
          </Button>
        </Paper>
      ) : (
        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
          <List>
            {cart.items.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem
                  sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2 }}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveItem(item._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.name} variant="rounded" sx={{ width: 80, height: 80 }} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={item.name} 
                    secondary={`R$ ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}`}
                    sx={{ flex: 2 }}
                  />
                  
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size="small"
                      sx={{ width: 60, '& input': { textAlign: 'center' } }}
                      inputProps={{ readOnly: true }}
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                      disabled={item.quantity >= (item.stock || 999)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  
                  <Typography variant="body1" fontWeight="bold" sx={{ minWidth: 100, textAlign: 'right' }}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Total: R$ {(cart.totalPrice || 0).toFixed(2)}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => navigate('/shop')}>
                Continuar comprando
              </Button>
              <Button variant="contained" onClick={handleCheckout} size="large">
                Finalizar Compra
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Cart;