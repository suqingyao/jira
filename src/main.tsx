import App from './App'
import { AppProviders } from '@/context'
import { createRoot } from 'react-dom/client'
import './App.css'
import 'antd/dist/antd.less'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <AppProviders>
    <App />
  </AppProviders>
)
