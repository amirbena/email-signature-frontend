import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EmailSignatureContextProvider from './context/ContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <EmailSignatureContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </EmailSignatureContextProvider>
);
