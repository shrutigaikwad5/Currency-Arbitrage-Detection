import { motion } from 'framer-motion'
import { ArrowDown, Brain, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

const steps = [
  { title: 'Fetch Exchange Rates', icon: TrendingUp },
  { title: 'Analyze Currency Network', icon: Brain },
  { title: 'Detect Arbitrage', icon: Sparkles },
  { title: 'Assess Risk', icon: ShieldCheck },
]

export function HowItWorksSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">How It Works</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">From raw market data to actionable profit.</h2>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.08 }} className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
              <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <step.icon size={18} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-50">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">The system orchestrates data ingestion, graph analysis, and risk scoring into a reliable trade recommendation.</p>
              {index < steps.length - 1 && <div className="mt-6 flex justify-end text-slate-400"><ArrowDown size={16} /></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
