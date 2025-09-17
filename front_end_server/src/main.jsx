import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './pages/Login'
import { Truck } from './pages/Selectr'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container">
      <Login />
      <Truck />
    </div>
  </StrictMode>,
)