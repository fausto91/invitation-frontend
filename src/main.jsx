import React from 'react'
import ReactDOM from 'react-dom/client'
import { EugeniaApp } from './EugeniaApp'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <EugeniaApp />
    </React.StrictMode>,
  </Provider>
  )
