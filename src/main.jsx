import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react';
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CookiesProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </CookiesProvider>
    </StrictMode>,
)
