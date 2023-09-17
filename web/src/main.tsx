import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { isEnvBrowser } from './utils/misc';
import './index.css';
import App from './App';

if (isEnvBrowser()) {
  const root = document.getElementById('root');
  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
};

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
