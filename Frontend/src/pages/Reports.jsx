import { BarChart3, TrendingUp } from 'lucide-react'

const metrics = [
  { label: 'Win rate', value: '68%' },
  { label: 'Avg. return', value: '11.2%' },
  { label: 'Exposure', value: '$84k' },
  { label: 'Signal quality', value: 'A+' },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              <BarChart3 size={16} /> Performance reports
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Investment analytics</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Track efficiency, profitability, and signal performance from one elegant workspace.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              +8.4% this month
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
