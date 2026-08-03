import { Brain, Sparkles, TrendingUp } from 'lucide-react'

const predictions = [
  { title: 'EUR/USD', signal: 'Bullish', confidence: '89%', note: 'Momentum remains strong as macro conditions support upside.' },
  { title: 'GBP/JPY', signal: 'Watch', confidence: '74%', note: 'Volatility is rising ahead of key macro releases.' },
  { title: 'USD/INR', signal: 'Neutral', confidence: '82%', note: 'Range-bound with calm liquidity after the latest policy move.' },
]

export default function Prediction() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              <Brain size={16} /> AI prediction engine
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Market intelligence</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Blend probabilities, momentum, and macro context into one intelligent signal stream for better timing.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              4 high-conviction signals today
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center gap-2 text-cyan-300">
            <Sparkles size={18} />
            <h3 className="text-lg font-semibold text-white">Signals today</h3>
          </div>
          <div className="mt-6 space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{prediction.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{prediction.note}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-cyan-300">{prediction.confidence}</div>
                    <div className="text-sm text-slate-300">{prediction.signal}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 p-6 shadow-2xl shadow-cyan-950/20">
          <h3 className="text-xl font-semibold text-white">Prediction snapshot</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Accuracy', value: '91.4%' },
              { label: 'Average hold', value: '6.2h' },
              { label: 'Signals', value: '24' },
              { label: 'Risk score', value: 'Low' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
