import { createContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

const normalizeUser = (user, fallbackEmail = '') => {
  if (!user || typeof user !== 'object') {
    return {
      email: fallbackEmail,
      fullName: fallbackEmail || 'User',
      name: fallbackEmail || 'User',
      username: fallbackEmail || 'User',
      role: 'ROLE_USER',
    }
  }

  const role = user.role || user.roles?.[0] || 'ROLE_USER'

  return {
    ...user,
    email: user.email || fallbackEmail,
    fullName: user.fullName || user.name || user.username || user.email || fallbackEmail || 'User',
    name: user.name || user.fullName || user.username || user.email || fallbackEmail || 'User',
    username: user.username || user.name || user.email || fallbackEmail || 'User',
    role,
  }
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser')
    return storedUser ? normalizeUser(JSON.parse(storedUser)) : null
  })

  const [token, setToken] = useState(() =>
    localStorage.getItem('authToken')
  )

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  )

  const [isLoading, setIsLoading] = useState(true)

  const clearAuthState = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    authService.setAuthToken(null)

    setToken(null)
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {

    const initialiseAuth = async () => {

      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('authUser')

      if (!storedToken) {
        setIsLoading(false)
        return
      }

      authService.setAuthToken(storedToken)

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser))
      }

      try {
        const user = await authService.getCurrentUser()
        const nextUser = user?.user || user?.profile || user || null

        if (nextUser) {
          setCurrentUser(nextUser)
          localStorage.setItem('authUser', JSON.stringify(nextUser))
          setIsAuthenticated(true)
        } else {
          clearAuthState()
        }
      } catch (error) {
        console.warn(error)
        clearAuthState()
      } finally {
        setIsLoading(false)
      }
    }

    initialiseAuth()

  }, [])

  const login = async (credentials) => {

    setIsLoading(true)

    try {
      const { token: nextToken, user } = await authService.login(credentials)

      if (!nextToken) {
        throw new Error("No authentication token returned.")
      }

      const user = {
        email: credentials.email,
        role: role,
      }

      const normalizedUser = normalizeUser(nextUser || { email: credentials.email }, credentials.email)
      const role = normalizedUser.role || localStorage.getItem('role') || 'ROLE_USER'
      const persistedUser = { ...normalizedUser, role }

      localStorage.setItem('authToken', nextToken)
      localStorage.setItem('authUser', JSON.stringify(user || { email: credentials.email }))
      authService.setAuthToken(nextToken)

      setToken(nextToken)
      setCurrentUser(user || { email: credentials.email })
      setIsAuthenticated(true)

      return { success: true, user: user || { email: credentials.email } }
    } catch (error) {

      clearAuthState()

      throw new Error(
        error.message || "Unable to sign in."
      )

    } finally {

      setIsLoading(false)

    }
  }

  const register = async (user) => {

    try {
      return await authService.register(user)
    } catch (error) {
      throw new Error(
        error.message ||
        "Unable to create account."
      )
    }

  }

  const logout = async () => {

    try {
      await authService.logout()
    } finally {
      clearAuthState()
    }

  }

  const refreshToken = async () => {

    try {
      return await authService.refreshToken()
    } catch (error) {
      throw new Error(
        error.message ||
        "Unable to refresh session."
      )
    }

  }

  const value = useMemo(() => ({
    currentUser,
    token,
    login,
    logout,
    register,
    refreshToken,
    isAuthenticated,
    isLoading,
  }), [currentUser, token, isAuthenticated, isLoading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext