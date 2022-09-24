import styled from '@emotion/styled'
import { Row } from './components/lib'

import { useAuth } from './context/auth-context'
import ProjectListScreen from './screens/project-list'

function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>LOGO</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
  grid-gap: 10rem;
`

const Header = styled(Row)`
  grid-area: header;
`

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``

const Main = styled.main`
  grid-area: main;
`
export default AuthenticatedApp
