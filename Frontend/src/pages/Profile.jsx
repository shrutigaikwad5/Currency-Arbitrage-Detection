import { UserCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { currentUser } = useAuth()

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-2xl font-semibold text-white">
              {(currentUser?.fullName || currentUser?.name || currentUser?.email || 'T').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{currentUser?.fullName || currentUser?.name || currentUser?.email || 'Trader profile'}</h2>
              <p className="mt-2 text-sm text-slate-400">Manage your professional fintech workspace and preferences.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
            <div className="flex items-center gap-2">
              <UserCircle size={16} />
              Verified account
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <h3 className="text-lg font-semibold text-white">Account overview</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-2 text-base font-semibold text-white">{currentUser?.email || 'Not provided'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 text-base font-semibold text-white">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
