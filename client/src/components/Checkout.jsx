import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const Checkout = () => {
  console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
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
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
