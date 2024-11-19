import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App/>
        <Toaster swipeDirection="right" duration={3000}  />
      </Provider>
    </StrictMode>
  </BrowserRouter>



)
