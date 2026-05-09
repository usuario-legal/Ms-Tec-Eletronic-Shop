import * as React from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmailIcon from '@mui/icons-material/Email';
import { useSearchParams } from 'react-router-dom';
import { useNotifier } from '../context/NotificationProvider';
import { apiClient, withRetry } from '../services/apiClient';

const fallbackFlow = [
  {
    code: 'ORDER_PLACED',
    label: 'Pedido realizado',
    description: 'Recebemos seu pedido e reservamos os produtos.',
  },
  {
    code: 'PAYMENT_VERIFIED',
    label: 'Pagamento confirmado',
    description: 'O pagamento foi confirmado com segurança.',
  },
  {
    code: 'PICKING_ITEMS',
    label: 'Preparando produtos',
    description: 'Os produtos estão sendo separados pela equipa.',
  },
  {
    code: 'PACKED_FOR_SHIPMENT',
    label: 'Pedido embalado',
    description: 'Os itens foram embalados e preparados para envio.',
  },
  {
    code: 'HANDOFF_TO_CARRIER',
    label: 'Enviado para transportadora',
    description: 'A transportadora recebeu a encomenda.',
  },
  {
    code: 'IN_TRANSIT',
    label: 'Em transporte',
    description: 'A encomenda está em deslocamento para o destino.',
  },
  {
    code: 'AT_LOCAL_DEPOT',
    label: 'Centro de distribuição local',
    description: 'O pedido chegou ao centro de distribuição local.',
  },
  {
    code: 'OUT_FOR_DELIVERY',
    label: 'Saiu para entrega',
    description: 'O entregador está a caminho com a encomenda.',
  },
  {
    code: 'DELIVERED',
    label: 'Entregue',
    description: 'O pedido foi entregue com sucesso.',
  },
  {
    code: 'DELIVERY_CONFIRMED',
    label: 'Entrega confirmada',
    description: 'A confirmação da entrega foi registrada no sistema.',
  },
];

const iconBase = { fontSize: 24, color: 'primary.main' };
const successIconBase = { ...iconBase, color: 'success.main' };

const statusIcons = {
  ORDER_PLACED: <InventoryIcon sx={iconBase} />,
  PAYMENT_VERIFIED: <HandshakeIcon sx={iconBase} />,
  PICKING_ITEMS: <WarehouseIcon sx={iconBase} />,
  QUALITY_CHECK: <QueryBuilderIcon sx={iconBase} />,
  PACKED_FOR_SHIPMENT: <InventoryIcon sx={iconBase} />,
  HANDOFF_TO_CARRIER: <DeliveryDiningIcon sx={iconBase} />,
  IN_TRANSIT: <LocalShippingIcon sx={iconBase} />,
  AT_LOCAL_DEPOT: <WarehouseIcon sx={iconBase} />,
  OUT_FOR_DELIVERY: <HomeIcon sx={iconBase} />,
  DELIVERED: <CheckCircleOutlineIcon sx={successIconBase} />,
  DELIVERY_CONFIRMED: <CheckCircleOutlineIcon sx={successIconBase} />,
};

const defaultIcon = <QueryBuilderIcon sx={iconBase} />;

const getStatusIcon = (code, size = 24) => {
  const baseIcon = statusIcons[code] || defaultIcon;
  return React.cloneElement(baseIcon, {
    sx: { ...(baseIcon.props.sx || {}), fontSize: size },
  });
};

const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;

function formatTimestamp(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-PT', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return '';
  }
}

function OrderTracking() {
  const { notify } = useNotifier();
  const [searchParams] = useSearchParams();

  const lastOrder = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('fusionLastOrder')) || {};
    } catch (error) {
      return {};
    }
  }, []);

  const initialForm = React.useMemo(() => {
    const paramOrderNumber = searchParams.get('orderNumber') || '';
    const paramEmail = searchParams.get('email') || '';
    return {
      orderNumber: paramOrderNumber || lastOrder.orderNumber || '',
      email: paramEmail || lastOrder.email || '',
    };
  }, [lastOrder.email, lastOrder.orderNumber, searchParams]);

  const [form, setForm] = React.useState(initialForm);
  const [loading, setLoading] = React.useState(false);
  const [trackingData, setTrackingData] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchTracking = React.useCallback(
    async (payload, { silent = false } = {}) => {
      const sanitizedOrderNumber = payload.orderNumber?.trim().toUpperCase();
      const sanitizedEmail = payload.email?.trim().toLowerCase();

      if (!sanitizedOrderNumber || !sanitizedEmail) {
        notify({ severity: 'warning', message: 'Digite o número do pedido e o email utilizado na compra.' });
        return;
      }

      if (!emailPattern.test(sanitizedEmail)) {
        notify({ severity: 'warning', message: 'Digite um email válido associado ao pedido.' });
        return;
      }

      setLoading(true);
      setErrorMessage('');

      if (!silent) {
        notify({ severity: 'info', message: 'A buscar status do pedido…', autoHideDuration: 2000 });
      }

      try {
        const { data } = await withRetry(() =>
          apiClient.post('orders/track', {
            orderNumber: sanitizedOrderNumber,
            email: sanitizedEmail,
          })
        );

        setTrackingData(data);

        try {
          localStorage.setItem('fusionLastOrder', JSON.stringify({ orderNumber: data.orderNumber, email: data.email }));
        } catch (storageError) {
          console.warn('Unable to persist last order reference', storageError);
        }

        if (!silent && data?.currentStatus?.label) {
          notify({ severity: 'success', message: `Status atualizado: ${data.currentStatus.label}` });
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
        const message = error?.response?.data?.error || 'Não foi possível localizar o pedido. Verifique os dados e tente novamente.';
        setErrorMessage(message);
        notify({ severity: 'error', message });
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  React.useEffect(() => {
    setForm(initialForm);
    if (initialForm.orderNumber && initialForm.email) {
      fetchTracking(initialForm, { silent: true });
    }
  }, [fetchTracking, initialForm]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchTracking(form);
  };

  const hasTracking = Boolean(trackingData);

  const activeFlow = React.useMemo(() => {
    if (!hasTracking) return [];
    const provided = trackingData?.statusFlow;
    if (Array.isArray(provided) && provided.length) {
      return provided;
    }
    return fallbackFlow;
  }, [hasTracking, trackingData]);

  const history = React.useMemo(() => {
    if (!hasTracking) return [];
    return trackingData?.statusHistory || [];
  }, [hasTracking, trackingData]);
  const historyMap = React.useMemo(() => {
    const entries = new Map();
    history.forEach(status => {
      entries.set(status.code, status);
    });
    return entries;
  }, [history]);
  const currentStatus = hasTracking ? trackingData?.currentStatus : null;

  const historyCodes = history.map(status => status.code);
  const activeCode = currentStatus?.code;
  const activeIndex = hasTracking ? activeFlow.findIndex(step => step.code === activeCode) : -1;
  const resolvedActiveIndex = hasTracking ? (activeIndex >= 0 ? activeIndex : Math.max(historyCodes.length - 1, 0)) : -1;
  const stepperActiveIndex = resolvedActiveIndex >= 0 ? resolvedActiveIndex : 0;

  const renderStatusAvatar = React.useCallback((code, isActive) => {
    const iconElement = getStatusIcon(code, 22);
    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isActive ? 'rgba(40, 116, 240, 0.12)' : 'rgba(148, 163, 184, 0.18)',
          flexShrink: 0,
          alignSelf: 'center',
        }}
      >
        {iconElement}
      </Box>
    );
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
        <Chip label="Rastreamento de Pedido" color="primary" variant="outlined" />
        <Typography variant="h3" fontWeight={700} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          Visibilidade em tempo real da encomenda
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
          Digite o número do pedido para acompanhar atualizações da entrega e status da encomenda.
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid #e0e0e0' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Número do pedido"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={handleChange}
                  placeholder="Ex: FE-482019"
                  required
                  fullWidth
                  size="small"
                  InputProps={{ sx: { textTransform: 'uppercase' } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                  fullWidth
                  size="small"
                />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ px: 4 }}>
                    {loading ? 'A buscar...' : 'Consultar pedido'}
                  </Button>
                  {trackingData && (
                    <Tooltip title="Atualizar status" arrow>
                      <IconButton color="primary" onClick={() => fetchTracking(form)} disabled={loading}>
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Precisa de ajuda? Verifique o email “Confirmação de Pedido” enviado após a compra.
                </Typography>
              </Stack>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={700}>
                Assistência ao Cliente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Para suporte relacionado à entrega, alterações ou informações da encomenda, entre em contacto com nossa equipa.
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  mstecheletronic@gmail.com
                </Typography>
              </Stack>
              {trackingData?.estimatedDelivery && (
                <Typography variant="caption" color="text.secondary">
                  Previsão de entrega: {formatTimestamp(trackingData.estimatedDelivery)}
                </Typography>
              )}
              {errorMessage && (
                <Typography variant="caption" color="error">
                  {errorMessage}
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ mt: 5, p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid #e0e0e0' }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" fontWeight={700}>
            {hasTracking ? 'Status do Pedido' : 'Status do Pedido'}
          </Typography>
          {trackingData?.orderNumber && <Chip label={`Pedido #: ${trackingData.orderNumber}`} variant="outlined" color="primary" size="small" />}
        </Stack>

        {hasTracking ? (
          <Stepper orientation="vertical" activeStep={stepperActiveIndex} sx={{ mt: 2 }}>
            {activeFlow.map((step, index) => {
              const statusEntry = historyMap.get(step.code);
              const isActive = index === resolvedActiveIndex;
              const completed = index < resolvedActiveIndex;
              return (
                <Step key={step.code || step.label} completed={completed}>
                  <StepLabel SlotProps={{ iconContainer: { sx: { display: 'none' } } }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      {renderStatusAvatar(step.code, isActive || completed)}
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700} color={isActive ? 'primary.main' : 'text.primary'}>
                          {step.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                        {statusEntry?.enteredAt && (
                          <Typography variant="caption" color="text.secondary">
                            Atualizado {formatTimestamp(statusEntry.enteredAt)}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        ) : (
          <Box
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(148, 163, 184, 0.08)',
              textAlign: 'left',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Pronto para acompanhar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Digite o número do pedido e o email utilizado na compra para acompanhar em tempo real. Após localizar o pedido, todas as atualizações aparecerão aqui.
            </Typography>
          </Box>
        )}
      </Paper>

      {hasTracking && history.length > 0 && (
        <Paper elevation={0} sx={{ mt: 5, p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Atualizações recentes
          </Typography>
          <List dense>
            {[...history].reverse().map(status => (
              <ListItem key={`${status.code}-${status.enteredAt}`} disableGutters>
                <ListItemText
                  primary={status.label}
                  secondary={`${formatTimestamp(status.enteredAt)} • ${status.description}`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default OrderTracking;