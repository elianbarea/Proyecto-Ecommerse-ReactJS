import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom' // todo lo que contiene el elemento browserRouter va a tener acceso a las funcionalidades del router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    </Router>
  </StrictMode>,
)
