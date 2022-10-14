import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from '.'

export enum STAT {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS
}

interface State<D> {
  error: Error | null
  data: D | null
  stat: STAT
}

const defaultInitialState: State<null> = {
  stat: STAT.IDLE,
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState
    }
  )
  const safeDispatch = useSafeDispatch(dispatch)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) => safeDispatch({ data, stat: STAT.SUCCESS, error: null }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) => safeDispatch({ error, stat: STAT.ERROR, data: null }),
    [safeDispatch]
  )

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise数据')
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      safeDispatch({ stat: STAT.LOADING })
      return promise
        .then(data => {
          setData(data)
          return data
        })
        .catch(err => {
          setError(err)
          if (config.throwOnError) {
            return Promise.reject(err)
          }
          return err
        })
    },
    [config.throwOnError, setData, setError, safeDispatch]
  )

  return {
    isIdle: state.stat === STAT.IDLE,
    isLoading: state.stat === STAT.LOADING,
    isError: state.stat === STAT.ERROR,
    isSuccess: state.stat === STAT.SUCCESS,
    run,
    setData,
    setError,
    retry,
    ...state
  }
}
