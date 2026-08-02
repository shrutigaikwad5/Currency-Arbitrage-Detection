import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const displayName = currentUser?.fullName || currentUser?.name || currentUser?.email || 'There'

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold">Welcome back, {displayName}</h1>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                Your authenticated workspace is ready. Review your portfolio, explore arbitrage opportunities, and manage predictions from one place.
              </p>
            </div>
            <Link to="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200">
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Portfolio', description: 'Track your assets and performance', href: '/portfolio' },
            { title: 'Arbitrage', description: 'Discover live opportunities', href: '/arbitrage' },
            { title: 'Predictions', description: 'Review your market outlook', href: '/predictions' },
            { title: 'Account', description: 'Manage your profile and security', href: '/login' },
          ].map((card) => (
            <Link key={card.title} to={card.href} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
