import api from './api'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  delete api.defaults.headers.common.Authorization
}

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Request failed. Please try again.'
}

export async function login(credentials) {
  const response = await api.post(API_ENDPOINTS.auth.login, credentials)

  const payload = response.data?.data || response.data

  const token = payload.token
  const role = payload.role

  return {
    token,
    role,
    message: payload.message || 'Login successful.',
    response,
  }
}

export async function register(user) {
  const response = await api.post(API_ENDPOINTS.auth.register, user)
  const payload = response.data?.data || response.data
  return { message: payload?.message || 'Registration successful.', response }
}

export async function logout() {
  try {
    await api.post(API_ENDPOINTS.auth.logout)
  } catch (error) {
    console.warn(getErrorMessage(error))
  }
}

export async function getCurrentUser() {
  const response = await api.get(API_ENDPOINTS.auth.me)
  return response.data?.data || response.data
}

export async function refreshToken() {
  return Promise.resolve({ message: 'Refresh token endpoint is not configured yet.' })
}
