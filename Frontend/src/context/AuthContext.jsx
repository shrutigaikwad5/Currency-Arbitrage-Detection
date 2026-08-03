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
    fullName:
      user.fullName ||
      user.name ||
      user.username ||
      user.email ||
      fallbackEmail ||
      'User',
    name:
      user.name ||
      user.fullName ||
      user.username ||
      user.email ||
      fallbackEmail ||
      'User',
    username:
      user.username ||
      user.name ||
      user.email ||
      fallbackEmail ||
      'User',
    role,
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser')
    return storedUser ? normalizeUser(JSON.parse(storedUser)) : null
  })

  const [token, setToken] = useState(
    () => localStorage.getItem('authToken')
  )

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  )

  const [isLoading, setIsLoading] = useState(true)

  const clearAuthState = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    localStorage.removeItem("role")
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
        setCurrentUser(normalizeUser(JSON.parse(storedUser)))
      }

      try {
        const response = await authService.getCurrentUser()

        const nextUser =
          response?.user ||
          response?.profile ||
          response ||
          null

        if (nextUser) {
          const normalizedUser = normalizeUser(nextUser)

          setCurrentUser(normalizedUser)

          localStorage.setItem(
            'authUser',
            JSON.stringify(normalizedUser)
          )

          setIsAuthenticated(true)
        } else {
          clearAuthState()
        }
      } catch (error) {
        console.error(error)
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
      const {
        token: nextToken,
        user: loggedInUser,
      } = await authService.login(credentials)

      if (!nextToken) {
        throw new Error('No authentication token returned.')
      }

      const normalizedUser = normalizeUser(
        loggedInUser,
        credentials.email
      )

      localStorage.setItem("role", normalizedUser.role)

      localStorage.setItem('authToken', nextToken)

      localStorage.setItem(
        'authUser',
        JSON.stringify(normalizedUser)
      )

      authService.setAuthToken(nextToken)

      setToken(nextToken)
      setCurrentUser(normalizedUser)
      setIsAuthenticated(true)

      return {
        success: true,
        user: normalizedUser,
      }
    } catch (error) {
      clearAuthState()

      throw new Error(
        error.message || 'Unable to sign in.'
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
        error.message || 'Unable to create account.'
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
        error.message || 'Unable to refresh session.'
      )
    }
  }

  const value = useMemo(
    () => ({
      currentUser,
      token,
      login,
      logout,
      register,
      refreshToken,
      isAuthenticated,
      isLoading,
    }),
    [currentUser, token, isAuthenticated, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext