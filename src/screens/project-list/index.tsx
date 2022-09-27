import { useDebounce, useDocumentTitle } from '@/utils'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import List from './list'
import SearchPanel from './search-panel'
import { useProjectsSearchParams } from './util'

const ProjectListScreen = () => {
  useDocumentTitle('任务列表', false)
  const [param, setParam] = useProjectsSearchParams()

  const {
    isLoading,
    error,
    data: list,
    retry
  } = useProjects(useDebounce(param, 500))

  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  )
}

export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
