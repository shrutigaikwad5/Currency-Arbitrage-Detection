import axios from 'axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }

  return config
}, (error) => {
  console.error('Request interceptor error:', error)
  return Promise.reject(error)
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Request failed.'

    if (status === 401) {
      console.warn('Unauthorized. Redirecting to login.', message)
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      window.location.assign('/login')
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Network error while calling API:', message)
    } else {
      console.error('API error:', message)
    }

    return Promise.reject(error)
  },
)

export const authApi = {
  login: (credentials) => api.post(API_ENDPOINTS.auth.login, credentials),
  register: (user) => api.post(API_ENDPOINTS.auth.register, user),
  logout: () => api.post(API_ENDPOINTS.auth.logout),
  me: () => api.get(API_ENDPOINTS.auth.me),
}

export default api
