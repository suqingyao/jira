import ProjectListScreen from './screens/project-list'
import SoftwareLogo from '@/assets/software-logo.svg'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'

// ! 将logo作为react组件使用
// import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'

function AuthenticatedApp() {
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
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          {/* <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} /> */}
          <img src={SoftwareLogo} alt="Logo" width={'180rem'} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type={'text'}>hi,{user.name}</Button>
          </Dropdown>
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
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0, 0, 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh -6rem);
`
export default AuthenticatedApp
