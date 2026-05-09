import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';
import { NotificationProvider } from './context/NotificationProvider';

// Define o título da página para MS Tech Eletronic
document.title = 'MS Tech Eletronic - Loja e Serviços Tecnológicos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </DevSupport>
  </React.StrictMode>
);