const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mstecheletronic@gmail.com',
    pass: 'SUA_SENHA_DE_APP_AQUI', // ⚠️ Use senha de app do Gmail (não a senha normal)
  },
});

// Rota para enviar mensagem de contacto
router.post('/contact', async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  console.log('Recebida mensagem de:', nome, email);

  const mailOptions = {
    from: email,
    to: 'mstecheletronic@gmail.com',
    subject: `Contacto MS Tech: ${assunto} - de ${nome}`,
    text: `
      📧 Nova mensagem do site MS Tech Eletronic
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      📝 Dados do remetente:
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      Nome: ${nome}
      Email: ${email}
      Assunto: ${assunto}
      
      💬 Mensagem:
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ${mensagem}
      
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      Enviado via formulário de contacto do site MS Tech Eletronic
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso para mstecheletronic@gmail.com');
    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email. Tente novamente mais tarde.' });
  }
});

module.exports = router;