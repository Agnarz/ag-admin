import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'jotai';
import { theme } from './theme';
import "@mantine/core/styles.css";
import './index.css'

import { MantineProvider } from '@mantine/core'
import App from './App.tsx'
import { isEnvBrowser } from './utils/misc.ts';

if (isEnvBrowser()) {
  const root = document.getElementById('root');
  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}
const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Provider>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
    </Provider>
  </React.StrictMode>
);
