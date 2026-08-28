import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeIcons } from '@fluentui/react';

import App from './App';
import { capturarEntradaFormulario } from './formEntry';
import './index.css';

initializeIcons();

// Captura ?payload=/?mode=... da URL e limpa a barra ANTES de qualquer tela.
// O formulario so usa isso depois do login (App so o renderiza quando logado).
capturarEntradaFormulario();

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root nao encontrado no index.html');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
