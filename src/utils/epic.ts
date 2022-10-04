import { Epic } from '@/types/epic'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp()
  return useQuery<Epic[]>(['epics', param], () =>
    client('Epics', { data: param })
  )
}

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: 'POST',
        data: params
      }),
    useAddConfig(queryKey)
  )
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
