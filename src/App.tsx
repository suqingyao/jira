import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import { useAuth } from './context/auth-context'
import { ErrorBoundary } from './components/error-boundary'
import { FullPageErrorFallback } from './components/lib'

function App() {
  const { user } = useAuth()

  return (
    <>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </>
  )
}

export default App
