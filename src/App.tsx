import AuthenticatedApp from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAuth } from './context/auth-context'

function App() {
  const { user } = useAuth()
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
