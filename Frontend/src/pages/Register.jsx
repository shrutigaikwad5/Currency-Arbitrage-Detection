import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (userData) => {
    try {
      setError('')
      await register(userData)
      setSuccessMessage('Account created successfully. Redirecting to login...')
      window.setTimeout(() => navigate('/login?registered=true', { replace: true }), 900)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          ← Back to home
        </Link>

        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="flex flex-col justify-center gap-5">
            <div className="inline-flex w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
              Create account
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Join <span className="text-indigo-600">ArbitrageX</span>
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Set up your account to access a smarter way to track opportunities and protect your capital.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
              <p className="font-semibold">What you get</p>
              <ul className="mt-2 space-y-2">
                <li>• Access to a personalized dashboard</li>
                <li>• Tracking for portfolio and arbitrage insights</li>
                <li>• Secure authentication and account management</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">Register</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Create a new account in just a few steps.</p>
            </div>
            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} error={error} successMessage={successMessage} onClearMessage={() => setSuccessMessage('')} />
          </div>
        </div>
      </div>
    </div>
  )
}
