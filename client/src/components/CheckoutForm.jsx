import { useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
// Imports do Material UI
import { Box, Paper, Typography, Alert, Divider, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setErrorMessage(null);

    // 1. Validação do formulário
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // 2. Fetch do ClientSecret (Backend)
    // OBS: Substitua pela sua lógica real de fetch
    try {
      const PAYMENT_INTENT_URL =
        process.env.NODE_ENV === 'production'
          ? import.meta.env.BASE_URL + '/api/create-payment-intent'
          : '/api/create-payment-intent';

      const res = await axios.post(PAYMENT_INTENT_URL);
      const { clientSecret } = await res.data;

      // 3. Confirmar pagamento
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: import.meta.env.BASE_URL,
        },
      });

      // Se chegar aqui, houve erro imediato (ex: cartão recusado)
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (e) {
      setErrorMessage('Erro de comunicação com o servidor.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 4,

        height: 'calc(100vh - 80px)',
        transform: 'translateY(80px)',
        overflowY: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '700px',
          borderRadius: 2,
          height: '800px',
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 3 }}
        >
          Finalizar Compra
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Seção de Contato */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Informações de Contato
            </Typography>
            <LinkAuthenticationElement />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Seção de Endereço */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Endereço de Entrega
            </Typography>
            <AddressElement options={{ mode: 'shipping' }} />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Seção de Pagamento */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Dados do Pagamento
            </Typography>
            <PaymentElement options={{ layout: 'tabs' }} />
          </Box>

          {/* Mensagem de Erro */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PaymentIcon />}
            disabled={!stripe || !elements}
            sx={{ py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
          >
            Pagar Agora
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CheckoutForm;
