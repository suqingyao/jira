import { useDebounce } from '@/utils'
import { useUrlQueryParam } from '@/utils/url'
import { useProjects } from '@/utils/useProjects'
import { useUser } from '@/utils/useUser'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import List from './list'
import SearchPanel from './search-panel'

const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param, 500)

  const { isLoading, error, data: list } = useProjects(debouncedParam)

  const { data: users } = useUser()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
