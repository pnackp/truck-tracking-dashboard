import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './pages/Login'
import { Select } from './pages/Struck'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container">
      <Login />
      <Select/> 
    </div>
  </StrictMode>,
)