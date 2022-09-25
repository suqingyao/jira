import SoftwareLogo from '@/assets/software-logo.svg'
import RouteView from '@/router'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'
import { resetRoute, useDocumentTitle } from './utils'

// ! 将logo作为react组件使用
// import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'

function AuthenticatedApp() {
  useDocumentTitle('项目任务列表')

  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <RouteView />
        </BrowserRouter>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Button type={'link'} onClick={logout}>
              登出
            </Button>
          )
        }
      ]}
    ></Menu>
  )
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} /> */}
        <Button type={'link'} onClick={resetRoute}>
          <img src={SoftwareLogo} alt="Logo" width={'180rem'} />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu}>
          <Button type={'text'}>hi,{user.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  z-index: 1;
  box-shadow: inset 0, 0, 5px rgba(0, 0, 0, 0.1);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh -6rem);
`
export default AuthenticatedApp
