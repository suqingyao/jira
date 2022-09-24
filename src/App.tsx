import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import { useAuth } from './context/auth-context'

function App() {
  const { user } = useAuth()
  console.log('🚀 ~ file: App.tsx ~ line 7 ~ App ~ user', user)

  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
