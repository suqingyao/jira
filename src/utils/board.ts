import { Board } from '@/types/board'
import { useQuery } from 'react-query'
import { useHttp } from './http'

export const useBoards = (param?: Partial<Board>) => {
  const client = useHttp()
  return useQuery<Board[]>(['boards', param], () =>
    client('boards', { data: param })
  )
}
