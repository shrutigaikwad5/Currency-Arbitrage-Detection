const users = [
  { name: 'Anika Patel', email: 'anika@arbitragex.io', role: 'Admin', status: 'Online' },
  { name: 'Daniel Kim', email: 'daniel@arbitragex.io', role: 'Trader', status: 'Reviewing' },
  { name: 'Sofia Cruz', email: 'sofia@arbitragex.io', role: 'Analyst', status: 'Pending' },
]

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">User management</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Members and access control</h2>
          </div>
          <button type="button" className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Invite user
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-t border-slate-800/80">
                <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
