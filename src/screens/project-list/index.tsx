import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from '@/utils'
import { useEffect, useState } from 'react'
import { useHttp } from '@/utils/http'
import styled from '@emotion/styled'

const API_URL = import.meta.env.VITE_API_URL

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debouncedParam = useDebounce(param, 500)
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useEffect(() => {
    fetch(`${API_URL}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
