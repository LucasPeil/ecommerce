import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Alert, AlertTitle } from '@mui/material';
import CheckoutForm from './CheckoutForm';
const Checkout = ({setTempStripeSuccess}) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
    developerTools: {
      assistant: {
        enabled: false,
      },
    },
  });
  const stripeAppearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1976d2',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      spacingUnit: '3px',
      borderRadius: '4px',
      fontSizeBase: '14px',
      gridRowSpacing: '12px',
    },
    rules: {
      '.Input': {
        padding: '10px 12px',
        fontSize: '14px',
      },
      '.Label': {
        fontSize: '13px',
        marginBottom: '4px',
      },
    },
  };
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'brl',
    appearance: stripeAppearance,
  };
  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', pt: 12, px: 2 }}>
      <Alert severity="warning" sx={{ mb: 4, borderRadius: '1rem',border:'1px solid #ccc', }}>
        <AlertTitle>Site Fictício</AlertTitle>
        Este é um site fictício para fins de demonstração. 
        <strong> Nenhuma transação real será processada</strong> e nenhum produto será enviado. 
        Este projeto foi desenvolvido apenas para composição de portfólio.
      </Alert>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm setTempStripeSuccess={setTempStripeSuccess} />
      </Elements>
    </Box>
  );
};

export default Checkout;
