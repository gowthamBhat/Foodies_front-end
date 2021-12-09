import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'react-toastify/dist/ReactToastify.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
