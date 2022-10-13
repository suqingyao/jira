import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import RouteView from '@/router'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { ButtonNoPadding, Row } from './components/lib'
import ProjectPopover from './components/project-popover'
import UserPopover from './components/user-popover'
import { useAuth } from './context/auth-context'
import ProjectModal from './screens/project-list/project-modal'
import { resetRoute, useDocumentTitle } from './utils'

function AuthenticatedApp() {
  useDocumentTitle('项目任务列表')

  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <RouteView />
        </Main>
        <ProjectModal />
      </BrowserRouter>
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return (
    <Dropdown
      overlay={
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
      }
    >
      <Button type={'text'}>hi,{user.name}</Button>
    </Dropdown>
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
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  display: flex;
  overflow: hidden;
  height: calc(100vh - 6rem);
`
export default AuthenticatedApp
