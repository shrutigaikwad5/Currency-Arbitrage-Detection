export function AdminDashboard() {
  const cards = [
    { title: 'Active users', value: '2.4k', detail: '+18% this week' },
    { title: 'Arbitrage signals', value: '67', detail: '12 high confidence' },
    { title: 'Pending reviews', value: '13', detail: 'Needs attention' },
    { title: 'Revenue impact', value: '$84k', detail: 'Quarterly trend up' },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Operations overview</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Admin command center</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">Monitor platform health, review active opportunities, and keep the exchange ecosystem performing smoothly.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-emerald-400">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">Recent market anomalies</h3>
          <div className="mt-5 space-y-3">
            {['EUR/USD spread widened by 0.42%', 'BTC/USDT liquidity improved in Asia', 'Risk flag triggered for a high-volume route'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">Priority actions</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>• Approve pending institutional withdrawals.</li>
            <li>• Review suspicious exchange-rate anomalies.</li>
            <li>• Sync onboarding permissions with compliance.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
