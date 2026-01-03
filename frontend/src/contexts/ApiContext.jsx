import { createContext, useContext } from 'react'

const ApiContext = createContext()

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within ApiProvider')
  }
  return context
}

export const ApiProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const API_KEY = import.meta.env.VITE_API_KEY || ''

  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...(API_KEY && { 'apikey': API_KEY }),
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'An error occurred',
          errors: data.errors || [],
        }
      }

      return data
    } catch (error) {
      if (error.status) {
        throw error
      }
      throw {
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: [],
      }
    }
  }

  const api = {
    get: (endpoint, params = {}) => {
      const queryString = new URLSearchParams(params).toString()
      const url = queryString ? `${endpoint}?${queryString}` : endpoint
      return apiCall(url, { method: 'GET' })
    },

    post: (endpoint, body) => {
      return apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}
