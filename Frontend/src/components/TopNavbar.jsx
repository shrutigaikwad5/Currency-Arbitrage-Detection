import { Bell, Menu, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ThemeToggle } from './ThemeToggle'

export function TopNavbar({ onMenuToggle }) {
  const { currentUser } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  const formattedTime = useMemo(() => currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  }), [currentTime])

  const displayName = currentUser?.fullName || currentUser?.name || currentUser?.email || 'Trader'

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuToggle} className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10 lg:hidden">
            <Menu size={18} />
          </button>
          <div>
            <p className="text-sm font-medium text-slate-400">Good afternoon</p>
            <h1 className="text-lg font-semibold text-white">{displayName}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <Search size={16} className="text-cyan-300" />
            <input className="w-full bg-transparent outline-none sm:w-48" placeholder="Search markets" />
          </label>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {formattedTime}
            </div>
            <button type="button" className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10">
              <Bell size={18} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
