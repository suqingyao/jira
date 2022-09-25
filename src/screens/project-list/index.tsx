import List from './list'
import SearchPanel from './search-panel'
import styled from '@emotion/styled'
import { useDebounce, useMount } from '@/utils'
import { Typography } from 'antd'
import { useState } from 'react'
import { useHttp } from '@/utils/http'
import { useProjects } from '@/utils/useProjects'
import { useUser } from '@/utils/useUser'

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  // const [users, setUsers] = useState([])
  const debouncedParam = useDebounce(param, 500)
  // const client = useHttp()

  // const { run, isLoading, error, data: list } = useAsync<Project[]>()

  // useEffect(() => {
  //   run(client('projects', { data: cleanObject(debouncedParam) }))
  // }, [debouncedParam])

  const { isLoading, error, data: list } = useProjects(debouncedParam)

  // useMount(() => {
  //   client('users').then(setUsers)
  // })

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
