import { motion } from 'framer-motion'

export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.article whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }} className="rounded-3xl border border-slate-200/70 bg-white/80 p-7 shadow-sm shadow-slate-200/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
      <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <Icon size={20} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-slate-50">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.article>
  )
}
