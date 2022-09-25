import { useUrlQueryParam } from '@/utils/url'
import { useMemo } from 'react'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) }), [param]),
    setParam
  ] as const
}
