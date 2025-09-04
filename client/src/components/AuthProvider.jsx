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
      domain=""
      clientId=""
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
