import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react';
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { BannerProvider } from './components/Banner/BannerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CurrentUserProvider>
        <BannerProvider>
          <App />
        </BannerProvider>
      </CurrentUserProvider>
    </StrictMode>,
)
