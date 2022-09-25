import AuthenticatedApp from './authenticated-app'
import { ErrorBoundary } from './components/error-boundary'
import { FullPageErrorFallback } from './components/lib'
import { useAuth } from './context/auth-context'
import UnauthenticatedApp from './unauthenticated-app'

function App() {
  const { user } = useAuth()

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ErrorBoundary>
  )
}

export default App
