import { Task } from '@/types/task'
import { QueryKey, useQueryClient } from 'react-query'
import { reorder } from './reorder'
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueriesData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return {
        previousItems
      }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueriesData(queryKey, context?.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter(item => item.id !== target.id) || []
  )

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.filter(item =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []))

export const useReorderBoardConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderList = reorder({ list: old, ...target }) as Task[]
    return orderList.map((item: Task) =>
      item.id === target.fromId ? { ...item, boardId: target.toBoardId } : item
    )
  })
