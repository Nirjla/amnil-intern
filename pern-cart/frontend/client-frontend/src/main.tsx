import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store.ts'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Toaster position="top-right"
        reverseOrder={false} />
      </Router>
    </Provider>
  </StrictMode>,
)
