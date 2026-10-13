import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tipografías autoalojadas (sin dependencia de Google Fonts)
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource-variable/manrope/wght.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
