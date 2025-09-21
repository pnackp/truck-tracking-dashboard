import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container"> 
      <App /> 
    </div>
  </StrictMode>,
)

// เรียกฟังชั่น app ก่อนเพื่อเช็ค token