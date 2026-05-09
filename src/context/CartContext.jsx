import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/apiClient';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartVersion, setCartVersion] = useState(0); // Forçar recarga

  // Verificar login
  useEffect(() => {
    const token = localStorage.getItem('MERNEcommerceToken');
    setIsLoggedIn(!!token);
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.user?.name || payload.name || 'Cliente');
      } catch (e) {
        setUserName('Cliente');
      }
    }
  }, []);

  // Buscar carrinho do backend
  const fetchCartFromBackend = useCallback(async () => {
    const token = localStorage.getItem('MERNEcommerceToken');
    if (!token) return null;
    
    try {
      const response = await apiClient.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar carrinho do backend:', error);
      return null;
    }
  }, []);

  // Carregar carrinho
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('MERNEcommerceToken');
    
    if (!token) {
      // Usuário NÃO logado: usar localStorage
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        try {
          setCart(JSON.parse(localCart));
        } catch (e) {
          setCart({ items: [], totalItems: 0, totalPrice: 0 });
        }
      } else {
        setCart({ items: [], totalItems: 0, totalPrice: 0 });
      }
      setLoading(false);
      return;
    }

    // Usuário LOGADO: buscar do backend
    setLoading(true);
    const backendCart = await fetchCartFromBackend();
    if (backendCart) {
      setCart(backendCart);
    } else {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
    }
    setLoading(false);
  }, [fetchCartFromBackend]);

  // Recarregar quando cartVersion mudar ou login mudar
  useEffect(() => {
    fetchCart();
  }, [fetchCart, cartVersion, isLoggedIn]);

  // Forçar recarga do carrinho (chamado após login)
  const refreshCart = useCallback(() => {
    setCartVersion(prev => prev + 1);
  }, []);

  // Adicionar ao carrinho
  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('MERNEcommerceToken');
    const productId = product._id || product.id;
    
    if (token) {
      try {
        const response = await apiClient.post('/cart', { productId, quantity });
        setCart(response.data);
      } catch (error) {
        console.error('Erro ao adicionar:', error);
      }
    } else {
      const newCart = { ...cart };
      const existingItem = newCart.items.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.items.push({
          _id: Date.now().toString(),
          productId: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          stock: product.stock,
        });
      }
      
      newCart.totalItems = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
      newCart.totalPrice = newCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      setCart(newCart);
      localStorage.setItem('localCart', JSON.stringify(newCart));
    }
  };

  // Atualizar quantidade
  const updateQuantity = async (itemId, quantity) => {
    const token = localStorage.getItem('MERNEcommerceToken');
    
    if (token) {
      try {
        const response = await apiClient.put(`/cart/${itemId}`, { quantity });
        setCart(response.data);
      } catch (error) {
        console.error('Erro ao atualizar:', error);
      }
    } else {
      const newCart = { ...cart };
      const itemIndex = newCart.items.findIndex(item => item._id === itemId);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          newCart.items.splice(itemIndex, 1);
        } else {
          newCart.items[itemIndex].quantity = quantity;
        }
      }
      
      newCart.totalItems = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
      newCart.totalPrice = newCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCart(newCart);
      localStorage.setItem('localCart', JSON.stringify(newCart));
    }
  };

  // Remover item
  const removeItem = async (itemId) => {
    const token = localStorage.getItem('MERNEcommerceToken');
    
    if (token) {
      try {
        const response = await apiClient.delete(`/cart/${itemId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Erro ao remover:', error);
      }
    } else {
      const newCart = { ...cart };
      newCart.items = newCart.items.filter(item => item._id !== itemId);
      newCart.totalItems = newCart.items.reduce((sum, item) => sum + item.quantity, 0);
      newCart.totalPrice = newCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCart(newCart);
      localStorage.setItem('localCart', JSON.stringify(newCart));
    }
  };

  // Limpar carrinho
  const clearCart = async () => {
    const token = localStorage.getItem('MERNEcommerceToken');
    
    if (token) {
      try {
        await apiClient.delete('/cart');
        setCart({ items: [], totalItems: 0, totalPrice: 0 });
      } catch (error) {
        console.error('Erro ao limpar:', error);
      }
    } else {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
      localStorage.removeItem('localCart');
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
    cartItemCount: cart.totalItems || 0,
    userName,
    isLoggedIn,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};