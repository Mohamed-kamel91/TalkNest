// eslint-disable-next-line import/order
import { scan } from 'react-scan';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { enableMocking } from './tests/mocks';

import './index.css';

scan({
  enabled: true,
});

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

enableMocking().then(() => {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
