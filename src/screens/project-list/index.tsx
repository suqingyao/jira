import * as qs from 'qs'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce } from '@/utils'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debouncedParam = useDebounce(param, 500)

  useEffect(() => {
    fetch(
      `${API_URL}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useEffect(() => {
    fetch(`${API_URL}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}

export default ProjectListScreen
