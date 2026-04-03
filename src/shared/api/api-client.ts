import axios from 'axios'

import { env } from '../../app/config/env'

let authToken: string | null = null

export function setApiAuthToken(token: string | null) {
  authToken = token
}

export class ApiError extends Error {
  status?: number
  details?: unknown

  constructor(message: string, status?: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const responseData = error.response?.data as { message?: string } | undefined
      const message =
        responseData?.message ?? error.message ?? 'Unexpected API error'

      return Promise.reject(new ApiError(message, status, error.response?.data))
    }

    return Promise.reject(new ApiError('Unexpected API error'))
  },
)
