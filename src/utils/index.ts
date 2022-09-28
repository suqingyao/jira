import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

/**
 * 清除对象中为空的字段
 * @param {*} object
 */
export const cleanObject = (object: Record<string, unknown>) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const stringifyURLParam = (params: Record<string, unknown>) => {
  const result = cleanObject(params)
  return Object.keys(result)
    .map(key => `${key}=${result[key]}`)
    .join('&')
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback && callback()
  }, [])
}

export const debounce = (func: () => void, wait = 500, immediate = false) => {
  let timer: NodeJS.Timeout

  return () => {
    if (immediate) {
      immediate = false
      func()
    }

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
    }, wait)
  }
}

export const useDebounce = <T>(value: T, wait?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(debounceValue)
    }, wait)

    return clearTimeout(timeout)
  }, [value, wait])

  return debounceValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)

  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item])
    },
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const arr = [...value]
      arr.splice(index, 1)
      setValue(arr)
    }
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const originTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = originTitle
      }
    }
  }, [keepOnUnmount, originTitle])
}

export const resetRoute = () => {
  window.location.href = window.location.origin
}

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filterEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  )
  return Object.fromEntries(filterEntries) as Pick<O, K>
}

export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return mountedRef
}
