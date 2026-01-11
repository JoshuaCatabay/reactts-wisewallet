import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import ThemeProvider from "./context/ThemeProvider";

import { WalletProvider } from "./context/WalletProvider"; // ✅ FIXED

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider>
    <WalletProvider>
      <App />
    </WalletProvider>
  </ThemeProvider>
  </StrictMode>,
)