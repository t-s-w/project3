import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
