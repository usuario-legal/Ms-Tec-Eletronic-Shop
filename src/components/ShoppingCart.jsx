import * as React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Typography, Divider, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function ShoppingCart({ cart, setCart }) {
  const navigate = useNavigate();

  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Carrinho de Compras - MS Tech Eletronic
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Seu carrinho está vazio.</Typography>
      ) : (
        <>
          <List>
            {cart.map(item => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <Button onClick={() => removeFromCart(item.id)} startIcon={<DeleteIcon />} color="error">
                      Remover
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.name} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={`${item.price.toLocaleString()} MZN`} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: {calculateTotal().toLocaleString()} MZN
          </Typography>
          <Button variant="contained" onClick={handleCheckout} sx={{ mt: 2 }}>
            Finalizar Compra
          </Button>
        </>
      )}
    </Box>
  );
}

export default ShoppingCart;