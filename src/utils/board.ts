import { Board } from '@/types/board'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { useHttp } from './http'
import {
  useAddConfig,
  useDeleteConfig,
  useReorderBoardConfig
} from './use-optimistic-options'

export const useBoards = (param?: Partial<Board>) => {
  const client = useHttp()
  return useQuery<Board[]>(['boards', param], () =>
    client('boards', { data: param })
  )
}

export const useAddBoard = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Board>) =>
      client(`boards`, {
        method: 'POST',
        data: params
      }),
    useAddConfig(queryKey)
  )
}

export const useDeleteBoard = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`boards/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export interface SortProps {
  fromId: number
  referenceId: number
  type: 'before' | 'after'
  fromBoardId?: number
  toBoardId?: number
}
export const useReorderBoard = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: SortProps) =>
      client('boards/reorder', {
        data: params,
        method: 'POST'
      }),
    useReorderBoardConfig(queryKey)
  )
}
