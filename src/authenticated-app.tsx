import SoftwareLogo from '@/assets/software-logo.svg'
import RouteView from '@/router'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ButtonNoPadding, Row } from './components/lib'
import ProjectPopover from './components/project-popover'
import { useAuth } from './context/auth-context'
import ProjectModal from './screens/project-list/project-modal'
import { resetRoute, useDocumentTitle } from './utils'

// ! 将logo作为react组件使用
// import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'

function AuthenticatedApp() {
  useDocumentTitle('项目任务列表')
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <BrowserRouter>
          <RouteView />
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  )
}

interface PageHeaderProps {
  setProjectModalOpen: (isOpen: boolean) => void
}

const PageHeader = ({ setProjectModalOpen }: PageHeaderProps) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} /> */}
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <img src={SoftwareLogo} alt="Logo" width={'180rem'} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
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
  box-shadow: inset 0, 0, 5px rgba(0, 0, 0, 0.1);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh -6rem);
`
export default AuthenticatedApp
