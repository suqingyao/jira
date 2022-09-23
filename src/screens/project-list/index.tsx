import * as qs from 'qs'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from '@/utils'
import { useEffect, useState } from 'react'
import { useHttp } from '@/utils/http'

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
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}

export default ProjectListScreen
