import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

/**
 * 清除对象中为空的字段
 * @param {*} object
 */
export const cleanObject = (object: Record<string, unknown>) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
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
  let timer: any

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

export const useDebounce = (value: unknown, wait?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(debounceValue)
    }, wait)

    return clearTimeout(timeout)
  }, [value, wait])

  return debounceValue
}
