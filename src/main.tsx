import { AppProviders } from '@/context'
import 'antd/dist/antd.less'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, useQueryClient } from 'react-query'
import App from './App'
import './App.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
const queryClient = useQueryClient()

root.render(
  <React.StrictMode>
    <AppProviders>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppProviders>
  </React.StrictMode>
)
