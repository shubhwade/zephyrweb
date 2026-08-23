import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { validateScheduleIntegrity } from './data/scheduleValidation.js'

if (import.meta.env?.DEV) {
  validateScheduleIntegrity();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
