import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, isAuthenticated } = useAuth()
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const redirectPath = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('redirect')
  }, [location.search])

  useEffect(() => {

    if (isAuthenticated) {
  const role = localStorage.getItem("role");

  if (role === "ROLE_ADMIN") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/dashboard", { replace: true });
  }
  return;
}

    const params = new URLSearchParams(location.search)

    if (params.get('registered') === 'true') {
      setSuccessMessage('Account created successfully. Please sign in.')
    }
  }, [isAuthenticated, location.search, navigate])

  const handleSubmit = async (credentials) => {

    try {

      setError('')
      const result = await login(credentials);

setSuccessMessage("Login successful. Redirecting...");

window.setTimeout(() => {
  const role = result.user?.role || localStorage.getItem("role");

  if (role === "ROLE_ADMIN") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/dashboard", { replace: true });
  }
}, 700);
    } catch (err) {

      setError(err.message)

    }

  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">

        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          ← Back to home
        </Link>

        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">

          <div className="flex flex-col justify-center gap-5">

            <div className="inline-flex w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
              Secure access
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back to <span className="text-indigo-600">ArbitrageX</span>
            </h1>

            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Sign in to manage your portfolio, review arbitrage opportunities,
              and keep your predictions in sync.
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">

              <p className="font-semibold">Why users trust us</p>

              <ul className="mt-2 space-y-2">
                <li>• Encrypted sessions with JWT-backed authentication</li>
                <li>• Protected dashboards and portfolio tools</li>
                <li>• Fast recovery and secure sign-in flow</li>
              </ul>

            </div>

          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950/60">

            <div className="mb-6 text-center">

              <h2 className="text-2xl font-semibold">
                Login
              </h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Access your account and continue optimizing your trades.
              </p>

            </div>

            <LoginForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              successMessage={successMessage}
              onClearMessage={() => setSuccessMessage('')}
            />

          </div>

        </div>

      </div>
    </div>
  )
}