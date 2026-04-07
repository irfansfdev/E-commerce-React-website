import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux' 
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* We removed the extra ChakraProvider here because App.jsx has the v3 Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
)