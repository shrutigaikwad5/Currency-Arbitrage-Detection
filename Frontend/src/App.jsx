import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { UserLayout } from './layouts/UserLayout'
import { AdminLayout } from './layouts/AdminLayout'
import Arbitrage from './pages/Arbitrage'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import LiveExchangeRatesPage from './pages/LiveExchangeRates'
import Login from './pages/Login'
import Prediction from './pages/Prediction'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Reports from './pages/Reports'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ContentPage } from './pages/admin/ContentPage'
import { UsersPage } from './pages/admin/UsersPage'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminRoute } from './routes/AdminRoute'
import { UserRoute } from './routes/UserRoute'

function App() {
  return (
     <CurrencyPage/>
    /*<ThemeProvider>
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
                  <UserRoute>
                    <UserLayout />
                  </UserRoute>
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

            <Route
              path="/administrator"
              element={(
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                </ProtectedRoute>
              )}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="currencies" element={<ContentPage title="Currencies" description="Manage supported currencies and regional market access." />} />
              <Route path="exchange-rates" element={<ContentPage title="Exchange Rates" description="Monitor live pricing, spreads, and rate updates." />} />
              <Route path="predictions" element={<ContentPage title="Predictions" description="Review upcoming market predictions and sentiment signals." />} />
              <Route path="arbitrage" element={<ContentPage title="Arbitrage" description="Inspect arbitrage opportunities with risk scoring." />} />
              <Route path="transactions" element={<ContentPage title="Transactions" description="Audit payment activity, settlements, and broker actions." />} />
              <Route path="reports" element={<ContentPage title="Reports" description="Create compliance summaries and operational performance reports." />} />
              <Route path="notifications" element={<ContentPage title="Notifications" description="Broadcast updates to traders and account admins." />} />
              <Route path="settings" element={<ContentPage title="Settings" description="Tune platform controls, permissions, and guardrails." />} />
              <Route path="profile" element={<ContentPage title="Profile" description="Manage your administrator identity and security preferences." />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
    */
  )
}

export default App
