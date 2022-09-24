import styled from '@emotion/styled'

import { useAuth } from './context/auth-context'
import ProjectListScreen from './screens/project-list'

function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>LOGO</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav></Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside></Aside>
      <Footer></Footer>
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

const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``

const Nav = styled.nav`
  grid-area: nav;
`

const Aside = styled.aside`
  grid-area: aside;
`

const Main = styled.main`
  grid-area: main;
`

const Footer = styled.footer`
  grid-area: footer;
`
// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: gray;
// `

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `

export default AuthenticatedApp
