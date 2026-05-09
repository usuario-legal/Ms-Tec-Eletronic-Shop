import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CircularProgress, Paper, IconButton, InputAdornment, Stack, Divider, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { apiClient } from '../services/apiClient';
import { useNotifier } from '../context/NotificationProvider';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useNotifier();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações
    if (!name.trim()) {
      setError('Nome é obrigatório');
      notify({ severity: 'error', message: 'Nome é obrigatório' });
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      notify({ severity: 'error', message: 'Por favor, insira um email válido' });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      notify({ severity: 'error', message: 'A senha deve ter pelo menos 6 caracteres' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      notify({ severity: 'error', message: 'As senhas não coincidem' });
      setLoading(false);
      return;
    }

    try {
      console.log('Tentando cadastrar:', { name: name.trim(), email: email.toLowerCase().trim() });
      
      const response = await apiClient.post('/auth/register', { 
        name: name.trim(), 
        email: email.toLowerCase().trim(), 
        password 
      });
      
      console.log('Resposta do servidor:', response.data);
      
      const token = response.data.token;
      
      if (!token) {
        throw new Error('Token não recebido do servidor');
      }
      
      // Usar a mesma chave do Login
      localStorage.setItem('MERNEcommerceToken', token);
      
      notify({ severity: 'success', message: 'Conta criada com sucesso! Redirecionando...' });
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (err) {
      console.error('Erro detalhado no registro:', err);
      console.error('Resposta de erro:', err.response);
      console.error('Dados do erro:', err.response?.data);
      
      let errorMessage = 'Falha no registro. Tente novamente.';
      
      if (err.response) {
        // O servidor respondeu com um status de erro
        if (err.response.data?.errors) {
          errorMessage = err.response.data.errors.map(error => error.msg).join(', ');
        } else if (err.response.data?.msg) {
          errorMessage = err.response.data.msg;
        } else if (err.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique suas informações.';
        } else if (err.response.status === 409) {
          errorMessage = 'Este email já está cadastrado. Faça login ou use outro email.';
        } else if (err.response.status === 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }
      } else if (err.request) {
        // A requisição foi feita mas não houve resposta
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5000';
        console.error('Sem resposta do servidor:', err.request);
      } else {
        // Algo aconteceu na configuração da requisição
        errorMessage = err.message || 'Erro desconhecido.';
      }
      
      setError(errorMessage);
      notify({ severity: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    setGoogleLoading(true);
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 5 }, borderRadius: 3 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" align="center" fontWeight={700}>
            Criar sua conta
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            Salve listas de desejos, acompanhe pedidos e tenha acesso a ofertas exclusivas - MS Tech Eletronic
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
          onClick={handleGoogleRegister}
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
          {googleLoading ? <CircularProgress size={24} /> : 'Registrar com Google'}
        </Button>

        <Divider sx={{ my: 2 }}>ou</Divider>

        <form onSubmit={handleRegister}>
          <TextField 
            label="Nome Completo" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            disabled={loading}
            autoComplete="name"
          />
          
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            disabled={loading}
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
            disabled={loading}
            helperText="Mínimo de 6 caracteres"
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
          
          <TextField
            label="Confirmar Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                Registrar
              </Button>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Já tem uma conta? <a href="/login">Faça login aqui</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;