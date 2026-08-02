import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Markets', href: '#markets' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleSectionClick = (event, href) => {
    event.preventDefault()

    const targetId = href.replace('#', '')
    const target = document.getElementById(targetId)

    if (target) {
      const offset = 96
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      window.history.pushState({}, '', href)
      return
    }

    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            AX
          </span>
          <span>
            Arbitrage<span className="text-indigo-600 dark:text-indigo-400">X</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(event) => handleSectionClick(event, item.href)} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {(currentUser?.fullName || currentUser?.name || currentUser?.email || 'U').charAt(0).toUpperCase()}
                </span>
                <span>{currentUser?.fullName || currentUser?.name || currentUser?.email || 'Profile'}</span>
              </Link>
              <button type="button" onClick={handleLogout} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200">
                Login
              </Link>
              <Link to="/register" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200">
                Register
              </Link>
              <Link to="/register" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                Open Account
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button type="button" aria-label="Toggle menu" onClick={() => setOpen((prev) => !prev)} className="rounded-full border border-slate-300 bg-white/70 p-2.5 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/95 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400" onClick={(event) => {
                handleSectionClick(event, item.href)
                setOpen(false)
              }}>
                {item.label}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="mt-2 inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <button type="button" className="inline-flex w-fit rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-indigo-500" onClick={() => { setOpen(false); handleLogout() }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mt-2 inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setOpen(false)}>
                  Register
                </Link>
                <Link to="/register" className="inline-flex w-fit rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-indigo-500" onClick={() => setOpen(false)}>
                  Open Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
