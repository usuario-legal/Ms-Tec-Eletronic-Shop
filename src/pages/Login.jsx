import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CircularProgress, Paper, IconButton, InputAdornment, Stack, Divider, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { apiClient } from '../services/apiClient';
import { useNotifier } from '../context/NotificationProvider';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useNotifier();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentando login:', { email });
      
      const response = await apiClient.post('/auth/login', { email, password });
      
      console.log('Resposta do login:', response.data);
      
      const token = response.data.token;
      
      // 🔥 LIMPAR TUDO antes de salvar o novo token
      localStorage.removeItem('MERNEcommerceToken');
      localStorage.removeItem('localCart');
      
      // 🔥 Salvar o novo token
      localStorage.setItem('MERNEcommerceToken', token);
      
      notify({ severity: 'success', message: 'Bem-vindo de volta! Redirecionando...' });
      
      // 🔥 Forçar recarga completa da página para limpar o estado do carrinho
      setTimeout(() => {
        window.location.href = '/';
      }, 400);
    } catch (err) {
      console.error('Erro no login:', err);
      
      let errorMessage = 'Falha no login. Tente novamente.';
      
      if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors.map(error => error.msg).join(', ');
      } else if (err.response?.data?.msg) {
        errorMessage = err.response.data.msg;
      } else if (err.response?.status === 401) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (err.request) {
        errorMessage = 'Não foi possível conectar ao servidor.';
      }
      
      setError(errorMessage);
      notify({ severity: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Limpar carrinho local antes do redirecionamento
    localStorage.removeItem('localCart');
    localStorage.removeItem('MERNEcommerceToken');
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 5 }, borderRadius: 3 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" align="center" fontWeight={700}>
            Bem-vindo de volta
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            Faça login para acessar seu carrinho, pedidos e recomendações personalizadas - MS Tech Eletronic
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          startIcon={<Google />}
          sx={{
            mb: 2,
            py: 1.5,
            borderColor: '#db4437',
            color: '#db4437',
            '&:hover': {
              borderColor: '#c23321',
              backgroundColor: 'rgba(219, 68, 55, 0.04)',
            },
          }}
        >
          {googleLoading ? <CircularProgress size={24} /> : 'Entrar com Google'}
        </Button>

        <Divider sx={{ my: 2 }}>ou</Divider>

        <form onSubmit={handleLogin}>
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            type="email"
            autoComplete="email"
          />
          <TextField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" size="large" fullWidth>
                Entrar
              </Button>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            <a href="/forgot-password">Esqueceu a senha?</a>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Não tem uma conta? <a href="/register">Registre-se aqui</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;