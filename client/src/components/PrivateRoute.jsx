import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function PrivateRoute({ children }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  if (isLoading) return <p>Carregando...</p>;

  if (!isAuthenticated) {
    loginWithRedirect({
      authorizationParams: {
        audience: 'https://ecommerce-api',
        scope: 'read:users',
      },
      appState: { returnTo: location.pathname.split('/').pop() },
    });
    return null; // enquanto redireciona
  }

  return children;
}
