import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify';

import { App } from './App'
import { AuthProvider } from './hooks/useAuth';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
