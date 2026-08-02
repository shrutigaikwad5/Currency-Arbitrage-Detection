import { motion } from 'framer-motion'

export function DashboardMock() {
  return (
    <section id="markets" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Live Intelligence</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">Institutional-grade signals, delivered in real time.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">The platform continuously evaluates price differences, liquidity constraints, and risk exposure so your team can act with confidence.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 p-4 shadow-2xl shadow-slate-950/20 dark:border-slate-800">
            <div className="rounded-[1.4rem] border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center justify-between rounded-full border border-slate-800 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Live Analysis Engine
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Secure • Audited</div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">EUR/USD</div>
                  <div className="mt-2 text-2xl font-semibold text-white">1.08422</div>
                </div>
                <div className="rounded-2xl bg-slate-800/70 p-4">
                  <div className="text-sm text-slate-400">GBP/USD</div>
                  <div className="mt-2 text-2xl font-semibold text-white">1.09341</div>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
                <div>
                  <div className="text-sm text-slate-400">Expected Profit</div>
                  <div className="mt-1 text-3xl font-semibold text-emerald-400">+0.84%</div>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400">
                  Risk-Free Opportunity Identified
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
