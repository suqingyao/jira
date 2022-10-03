import { useProject } from '@/utils/project'
import { useUrlQueryParam } from '@/utils/url'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useBoardsQueryKey = () => ['boards', useBoardSearchParams()]

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }),
    [projectId]
  )
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]
