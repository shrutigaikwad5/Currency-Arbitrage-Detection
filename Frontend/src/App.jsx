import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardLayout } from './layouts/DashboardLayout'
import Arbitrage from './pages/Arbitrage'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import LiveExchangeRatesPage from './pages/LiveExchangeRates'
import Login from './pages/Login'
import Prediction from './pages/Prediction'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Reports from './pages/Reports'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={(
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              )}
            >
              <Route index element={<Dashboard />} />
              <Route path="live-rates" element={<LiveExchangeRatesPage />} />
              <Route path="prediction" element={<Prediction />} />
              <Route path="arbitrage" element={<Arbitrage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
