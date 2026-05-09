const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/product');
const auth = require('../middleware/auth');

// Buscar carrinho do usuário logado
router.get('/cart', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Buscando carrinho para usuário:', userId);
    
    let cart = await Cart.findOne({ userId: userId });
    
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
      await cart.save();
      console.log('Carrinho criado para usuário:', userId);
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({ error: 'Erro ao buscar carrinho: ' + error.message });
  }
});

// Adicionar item ao carrinho
router.post('/cart', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    
    console.log('Adicionando produto:', productId, 'para usuário:', userId);
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        stock: product.stock,
      });
    }
    
    await cart.save();
    console.log('Produto adicionado com sucesso');
    res.json(cart);
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    res.status(500).json({ error: 'Erro ao adicionar ao carrinho: ' + error.message });
  }
});

// Atualizar quantidade
router.put('/cart/:itemId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ userId: userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({ error: 'Erro ao atualizar carrinho' });
  }
});

// Remover item
router.delete('/cart/:itemId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId: userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }
    
    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Erro ao remover item:', error);
    res.status(500).json({ error: 'Erro ao remover item' });
  }
});

// Limpar carrinho
router.delete('/cart', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId: userId });
    
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({ message: 'Carrinho limpo com sucesso', cart });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    res.status(500).json({ error: 'Erro ao limpar carrinho' });
  }
});

module.exports = router;