const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ms_tech_secret_key_2026';

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'Token não encontrado' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};