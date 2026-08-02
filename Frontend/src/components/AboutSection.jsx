import { motion } from 'framer-motion'
import { CheckCircle2, Globe2, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = ['Banks', 'Forex Traders', 'Investment Firms', 'Financial Institutions']
const checklist = [
  'Regulatory Transparency',
  '24×7 Market Coverage',
  'Institutional Reporting',
  'Enterprise-Grade Security',
]

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-2xl shadow-slate-950/20 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-200">
                <Sparkles size={15} /> Universal market intelligence
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Bridge the gap in global currency markets.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Currency arbitrage turns latency, price divergence, and opportunity detection into systematic advantage. With AI, institutions can move from reactive execution to proactive portfolio management.</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-medium text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-slate-200">
                <Globe2 size={20} className="text-indigo-300" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Why AI</span>
              </div>
              <p className="mt-4 text-sm leading-8 text-slate-300">Modern markets are fragmented, fast-moving, and difficult to monitor manually. ArbitrageX aggregates signals, evaluates liquidity, and recommends paths before the market closes the gap.</p>

              <div className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/30 p-3 text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400" /> {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-2xl font-semibold text-white">99.9%</div>
                  <div className="mt-1 text-sm text-slate-400">Uptime</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-2xl font-semibold text-white">140+</div>
                  <div className="mt-1 text-sm text-slate-400">Liquidity Pools</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
