import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider" 
import { CartProvider } from './CartContext' // 1. Added this import
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap everything in CartProvider so the "Backpack" is available everywhere */}
    <CartProvider>
      <Provider>
        <App />
      </Provider>
    </CartProvider>
  </StrictMode>,
)