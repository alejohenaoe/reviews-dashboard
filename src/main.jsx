import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ReviewsProvider } from './state/ReviewsContext.jsx'
import { ThemesProvider } from './state/ThemesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReviewsProvider>
        <ThemesProvider>
          <App />
        </ThemesProvider>
      </ReviewsProvider>
    </BrowserRouter>
  </StrictMode>,
)
