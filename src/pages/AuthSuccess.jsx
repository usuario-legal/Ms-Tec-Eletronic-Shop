import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useNotifier } from '../context/NotificationProvider';

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotifier();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      notify({ severity: 'success', message: 'Login com Google realizado com sucesso!' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      notify({ severity: 'error', message: 'Falha na autenticação com Google' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [location, navigate, notify]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Autenticando com Google...
        </Typography>
      </Paper>
    </Container>
  );
}

export default AuthSuccess;