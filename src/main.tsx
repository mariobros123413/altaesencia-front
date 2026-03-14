import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

window.requestAnimationFrame(() => {
  const bootLoader = document.getElementById('app-shell-loader');

  if (!bootLoader) {
    return;
  }

  bootLoader.classList.add('app-shell-loader--hidden');

  window.setTimeout(() => {
    bootLoader.remove();
  }, 500);
});
