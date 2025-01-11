import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './Context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './Context/ThemeProvider'




createRoot(document.getElementById('root')).render(
  <StrictMode>

  
    <AuthProvider>
        <ThemeProvider>
            
        <RouterProvider router={router} />
        </ThemeProvider>

    </AuthProvider>

  

    <ToastContainer />
  
  </StrictMode>,
)
