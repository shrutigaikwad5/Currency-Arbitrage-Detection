import { motion } from 'framer-motion'
import { stats } from '../data/statistics'

export function StatsSection() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-10 lg:p-14">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="text-3xl font-semibold text-white">{item.value}</div>
              <div className="mt-2 text-sm text-slate-300">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
