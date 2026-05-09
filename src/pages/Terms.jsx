import * as React from 'react';
import { Box, Chip, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const termsSections = [
  {
    title: 'Uso da nossa plataforma',
    copy: 'A MS Tech Eletronic oferece uma loja digital selecionada para tecnologia premium. Ao visitar o nosso site, concorda em interagir respeitosamente, abster-se de atividades maliciosas e fornecer apenas informações pessoais precisas. Contas podem ser suspensas quando comportamentos suspeitos são detetados para manter a comunidade segura.',
    icon: <VerifiedUserIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Encomendas, faturação e preços',
    copy: 'Os totais são confirmados no momento do pagamento, incluindo impostos e portes de envio quando aplicável. Reservamo-nos o direito de cancelar ou reembolsar encomendas em caso de erros de preços ou limitações de stock. Promoções terão critérios de elegibilidade claramente indicados.',
    icon: <PaymentsIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Compromissos de entrega',
    copy: 'A maioria dos produtos em stock é enviada dentro de um dia útil a partir dos nossos centros de distribuição. Os prazos de entrega são estimativas sujeitas ao desempenho da transportadora. Verifique cuidadosamente o seu endereço de entrega - encomendas não entregues podem incorrer em taxas de reenvio.',
    icon: <LocalShippingIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Devoluções e trocas',
    copy: 'Garantimos a qualidade do hardware que oferecemos. Produtos elegíveis podem ser devolvidos dentro de 30 dias após a entrega, desde que estejam em condições de novo com a embalagem original. Itens de higiene ou venda final serão claramente marcados como não-retornáveis antes da compra.',
    icon: <AutorenewIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Suporte e acompanhamento',
    copy: 'A nossa equipa de atendimento adora resolver problemas difíceis. Se surgir algum problema, contacte-nos através do Centro de Suporte para documentar os detalhes e fornecer um prazo de resolução. Emergências que afetem a segurança do dispositivo terão prioridade no atendimento.',
    icon: <SupportAgentIcon color="primary" fontSize="large" />,
  },
];

function Terms() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
        <Chip label="Termos de Serviço" color="primary" variant="outlined" />
        <Typography variant="h3" fontWeight={700}>
          O acordo que rege a nossa parceria
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
          Estes termos garantem que cada encomenda da MS Tech Eletronic seja tratada com integridade, transparência e o nível de cuidado que espera de um fornecedor premium.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Última atualização: Maio 4, 2026
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ pr: 4, pt: 1, borderRadius: 4 }}>
        <Stack spacing={4}>
          {termsSections.map(section => (
            <Grid container spacing={3} key={section.title} alignItems="flex-start">
              <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                {section.icon}
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {section.copy}
                </Typography>
              </Grid>
            </Grid>
          ))}

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ pl: 4 }}>
              As suas responsabilidades
            </Typography>
            <List dense sx={{ pl: 4, pb: 4 }}>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <GavelIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Forneça informações precisas de conta e faturação para que as encomendas cheguem sem atrasos." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <GavelIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Respeite a propriedade intelectual e use o conteúdo do site apenas para compras pessoais." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <GavelIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Notifique-nos rapidamente se acredita que a sua conta foi acedida sem permissão." />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Terms;