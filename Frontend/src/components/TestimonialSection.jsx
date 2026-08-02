import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'ArbitrageX gave our treasury desk visibility into high-confidence routes within minutes of deployment.',
    name: 'Mina Chen',
    title: 'VP Treasury, Northstar Capital',
  },
  {
    quote: 'The interface is remarkably clear, and the AI signals feel more precise than any other platform we tested.',
    name: 'Daniel Brooks',
    title: 'Head of FX Strategy, Meridian Trade',
  },
  {
    quote: 'It is elegant, stable, and operationally robust for our global teams working across multiple time zones.',
    name: 'Sara Alvi',
    title: 'Director of Markets, Cobalt Bank',
  },
]

export function TestimonialSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Testimonials</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">Trusted by institutions that need precision.</h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article key={item.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.08 }} className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-7 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-300">“{item.quote}”</p>
              <div className="mt-6">
                <div className="font-semibold text-slate-950 dark:text-slate-50">{item.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{item.title}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
