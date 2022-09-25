import { AppProviders } from '@/context'
import 'antd/dist/antd.less'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
