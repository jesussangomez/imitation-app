import React from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from '@mui/material/styles'
import theme from 'config/theme'

import {
  CssBaseline
} from '@mui/material'

import { FirebaseProvider } from 'context/provider/firebase'

import App from './app'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('app')
const root = createRoot(container)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope)
    // console.log(registration.scope)
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err)
  })
}

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </React.StrictMode>
  </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
