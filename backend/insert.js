const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = require('./seed/productSeeds.js');

mongoose.connect('mongodb://localhost:27017/ms_tech_eletronic')
  .then(async () => {
    console.log('Conectado ao MongoDB');
    await Product.deleteMany({});
    console.log('Produtos antigos removidos');
    
    // Se for uma função, executar; se for array, inserir
    if (typeof products === 'function') {
      await products({ force: true, skipIfExists: false });
    } else {
      await Product.insertMany(products);
    }
    
    const count = await Product.countDocuments();
    console.log(`✅ ${count} produtos inseridos com sucesso!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro:', err);
    process.exit(1);
  });
