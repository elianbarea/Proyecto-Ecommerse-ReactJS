import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'

console.log('main.jsx ejecutado')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </StrictMode>
)
