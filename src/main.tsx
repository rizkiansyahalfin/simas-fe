import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppProviders from './components/providers/AppProviders'
import { registerSW } from 'virtual:pwa-register'
import './i18n/config'

registerSW({
  onNeedRefresh() {
    console.log('Update aplikasi tersedia')
  },
  onOfflineReady() {
    console.log('Aplikasi siap digunakan offline')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
