import { Project } from '@/screens/project-list/list'
import { useEffect } from 'react'
import { cleanObject } from '.'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param])

  return result
}
