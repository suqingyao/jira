import { Project } from '@/screens/project-list/list'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHttp } from './http'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery(['project', param], () => client('projects', { data: param }))
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: 'POST',
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
