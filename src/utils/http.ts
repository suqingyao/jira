import * as auth from '@/auth-provider'
import qs from 'qs'
import { useCallback } from 'react'
import { useAuth } from './../context/auth-context'

const API_URL = import.meta.env.VITE_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toLocaleUpperCase() === 'GET') {
    console.log(data)

    endpoint += `?${decodeURIComponent(qs.stringify(data))}`
  }
  return window.fetch(`${API_URL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject(response)
    }
    const data = await response.json()
    if (response.ok) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
