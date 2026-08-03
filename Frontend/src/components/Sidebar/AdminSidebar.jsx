import { BarChart3, Bell, Brain, ChevronRight, LayoutDashboard, LogOut, Repeat, Settings, ShieldCheck, TrendingUp, UserCircle, Users, Wallet2 } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navigationItems = [
  { to: '/administrator', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/administrator/users', label: 'Users', icon: Users },
  { to: '/administrator/currencies', label: 'Currencies', icon: Wallet2 },
  { to: '/administrator/exchange-rates', label: 'Exchange Rates', icon: TrendingUp },
  { to: '/administrator/predictions', label: 'Predictions', icon: Brain },
  { to: '/administrator/arbitrage', label: 'Arbitrage Opportunities', icon: Repeat },
  { to: '/administrator/transactions', label: 'Transactions', icon: BarChart3 },
  { to: '/administrator/reports', label: 'Reports', icon: BarChart3 },
  { to: '/administrator/notifications', label: 'Notifications', icon: Bell },
  { to: '/administrator/settings', label: 'Settings', icon: Settings },
  { to: '/administrator/profile', label: 'Profile', icon: UserCircle },
]

export function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-white/10 bg-slate-950/95 px-4 py-5 text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-violet-600 text-sm font-semibold shadow-lg shadow-cyan-500/20">
            AX
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Admin Panel</p>
            <p className="text-xs text-slate-400">ArbitrageX Control Center</p>
          </div>
        </div>
        <button type="button" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 lg:hidden" onClick={onClose}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-semibold text-white">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Administrator</p>
          <p className="truncate text-xs text-slate-400">Security & operations</p>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/administrator'}
            onClick={onClose}
            className={({ isActive }) => `group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 text-white shadow-lg shadow-cyan-500/10' : 'text-slate-300 hover:bg-white/8 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-cyan-300" />
                  {label}
                </span>
                <ChevronRight size={16} className={`transition ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <button type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white">
          <ShieldCheck size={18} className="text-slate-400" />
          System guard
        </button>
        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
