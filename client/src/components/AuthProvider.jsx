// src/auth/Auth0ProviderWithNavigate.jsx
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Auth0ProviderComponent({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/', { replace: true });
  };

  return (
    <Auth0Provider
      /* domain={import.meta.env.VITE_AUTH0_DOMAIN}
               clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} */
      domain="dev-l3qgrjq4agwdbcug.us.auth0.com"
      clientId="yKwGKu8x7pZLtnfuLYA7DzdUcVwfmeE8"
      authorizationParams={{
        redirect_uri: window.location.origin + '/forniture',
      }}
      onRedirectCallback={onRedirectCallback}
      /*  authorizationParams={{
                 redirect_uri: window.location.origin,
                 audience: import.meta.env.VITE_AUTH0_AUDIENCE,
               }} */
    >
      {children}
    </Auth0Provider>
  );
}
