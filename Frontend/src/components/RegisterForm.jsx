import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Toast } from './Toast'

export function RegisterForm({ onSubmit, isLoading, error, successMessage, onClearMessage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.'
    if (!formData.phoneNumber.trim()) nextErrors.phoneNumber = 'Phone number is required.'
    if (!formData.country.trim()) nextErrors.country = 'Country is required.'
    if (!formData.password) nextErrors.password = 'Password is required.'
    else if (formData.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) nextErrors.password = 'Use upper, lower case and a number.'
    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.'
    else if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = 'Passwords do not match.'
    if (!formData.terms) nextErrors.terms = 'You must accept the terms and conditions.'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    await onSubmit({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      country: formData.country,
      password: formData.password,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/70 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      {successMessage ? <Toast message={successMessage} type="success" onClose={onClearMessage} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="John Doe" />
          {errors.fullName ? <p className="mt-2 text-sm text-rose-500">{errors.fullName}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="name@example.com" />
          {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phoneNumber">Phone Number</label>
          <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="+91 98765 43210" />
          {errors.phoneNumber ? <p className="mt-2 text-sm text-rose-500">{errors.phoneNumber}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="country">Country</label>
          <input id="country" name="country" value={formData.country} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="India" />
          {errors.country ? <p className="mt-2 text-sm text-rose-500">{errors.country}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
          <div className="relative">
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="Create a strong password" />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute inset-y-0 right-3 flex items-center text-slate-500" aria-label="Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password ? <p className="mt-2 text-sm text-rose-500">{errors.password}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900" placeholder="Retype password" />
            <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute inset-y-0 right-3 flex items-center text-slate-500" aria-label="Toggle confirm password visibility">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-500">{errors.confirmPassword}</p> : null}
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
        <span>I agree to the terms and conditions.</span>
      </label>
      {errors.terms ? <p className="text-sm text-rose-500">{errors.terms}</p> : null}

      <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
        {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Sign in
        </a>
      </p>
    </form>
  )
}
