import { ArrowUpRight, BarChart3, Brain, Repeat, Sparkles, Wallet2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const cards = [
  { title: 'Total Currency Pairs', value: '248', change: '+12%', icon: Wallet2, href: '/dashboard/live-rates' },
  { title: 'Active Opportunities', value: '18', change: '+5%', icon: Repeat, href: '/dashboard/arbitrage' },
  { title: 'Predictions Today', value: '24', change: '+9%', icon: Brain, href: '/dashboard/prediction' },
  { title: 'Market Status', value: 'Stable', change: 'Live', icon: BarChart3, href: '/dashboard/reports' },
]

export default function Dashboard() {
  const { currentUser } = useAuth()
  const displayName = currentUser?.fullName || currentUser?.name || currentUser?.email || 'There'

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              <Sparkles size={16} /> Fintech workspace
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Welcome back, {displayName}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Monitor markets, evaluate AI signals, uncover arbitrage cycles, and review your performance from a single secure dashboard.
            </p>
          </div>
          <Link to="/dashboard/live-rates" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
            Open live markets
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, change, icon: Icon, href }) => (
          <Link key={title} to={href} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 transition hover:-translate-y-1 hover:border-cyan-400/40">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-300">
                <Icon size={18} />
              </div>
              <span className="text-sm font-semibold text-emerald-300">{change}</span>
            </div>
            <p className="mt-6 text-sm text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Latest updates</h2>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Synced just now</span>
          </div>
          <div className="mt-6 space-y-4">
            {[
              'New opportunity detected across EUR/USD and GBP/JPY.',
              'Prediction confidence strengthened after market rotation.',
              'Liquidity remains healthy across the top 20 pairs.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 p-6 shadow-2xl shadow-cyan-950/20">
          <h2 className="text-xl font-semibold text-white">Quick actions</h2>
          <div className="mt-6 space-y-3">
            {[
              ['Live Rates', '/dashboard/live-rates'],
              ['Prediction', '/dashboard/prediction'],
              ['Arbitrage', '/dashboard/arbitrage'],
              ['Profile', '/dashboard/profile'],
            ].map(([label, href]) => (
              <Link key={label} to={href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40">
                <span>{label}</span>
                <ArrowUpRight size={16} className="text-cyan-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
