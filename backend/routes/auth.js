const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ms_tech_secret_key_2026';

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe com este email' });
    }
    
    // Criar usuário (a senha será criptografada pelo pre-save do modelo)
    const user = new User({ name, email, password });
    await user.save();
    
    // Criar token
    const payload = { user: { id: user.id, name: user.name } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '48h' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Email ou senha incorretos' });
    }
    
    // Comparar senha usando o método do modelo
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Email ou senha incorretos' });
    }
    
    // Criar token
    const payload = { user: { id: user.id, name: user.name } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '48h' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;