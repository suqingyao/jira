import { useProject } from '@/utils/project'
import { useUrlQueryParam } from '@/utils/url'
import { useMemo } from 'react'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) }), [param]),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    'projectCreate'
  ])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => {
    setProjectModalOpen({ projectCreate: undefined })
    setEditingProjectId({ editingProjectId: undefined })
  }
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
