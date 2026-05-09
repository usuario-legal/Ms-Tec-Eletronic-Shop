const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

// Ajuste o caminho conforme seu modelo de User
// Pode ser '../models/User' ou '../models/user'
const User = require('../models/User');

const adminUser = {
  name: 'Admin MS Tech',
  email: 'admin@mstech.com',
  password: 'admin123',
  isAdmin: true,
  role: 'admin'
};

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Conectado ao MongoDB');

    // Verificar se já existe
    const existingUser = await User.findOne({ email: adminUser.email });
    if (existingUser) {
      console.log('⚠️ Admin já existe!');
      console.log(`📧 Email: ${adminUser.email}`);
      console.log(`🔑 Password: admin123`);
      process.exit();
    }

    // Criar hash da password
    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    await User.create(adminUser);
    console.log('✅ Admin criado com sucesso!');
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔑 Password: admin123`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
    process.exit(1);
  }
}

seedAdmin();