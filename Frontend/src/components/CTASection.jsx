import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section id="cta" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 text-white shadow-2xl shadow-indigo-500/25 lg:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-sm font-medium text-indigo-50">
              <Sparkles size={15} /> Ready to act
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Ready to capitalize on market inefficiencies?</h2>
            <p className="mt-4 text-lg leading-8 text-indigo-50/90">Launch a 14-day free trial, connect your stack, and start detecting opportunities with institutional clarity.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#home" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5">
              Start 14-Day Free Trial <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Talk to Market Specialist
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-indigo-50/80">No credit card required.</p>
      </motion.div>
    </section>
  )
}
