import { useProjectIdInUrl } from '../board/util'

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]
