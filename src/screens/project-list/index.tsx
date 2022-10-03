import { ButtonNoPadding, ErrorBox, Row } from '@/components/lib'
import { useDebounce, useDocumentTitle } from '@/utils'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import styled from '@emotion/styled'
import List from './list'
import SearchPanel from './search-panel'
import { useProjectModal, useProjectsSearchParams } from './util'

const ProjectListScreen = () => {
  useDocumentTitle('任务列表', false)
  const [param, setParam] = useProjectsSearchParams()

  const { open } = useProjectModal()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500))

  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
