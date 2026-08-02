import { motion } from 'framer-motion'
import { featureItems } from '../data/features'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Platform Capabilities</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">Designed for speed. Built for stability.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">From real-time pricing to multi-way arbitrage and risk analysis, every layer is engineered for institutional decision-making.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureItems.map((item, index) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
