import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is Currency Arbitrage?',
    answer: 'Currency arbitrage is the practice of exploiting small price discrepancies across correlated markets to capture risk-adjusted profit while preserving balanced exposure.',
  },
  {
    question: 'How does AI work?',
    answer: 'ArbitrageX combines live market feeds, graph-based analysis, and predictive models to detect opportunities and score them based on risk and confidence.',
  },
  {
    question: 'How often are rates updated?',
    answer: 'Rates are refreshed continuously and can be consumed via a robust API layer designed for low-latency enterprise operations.',
  },
  {
    question: 'How secure is the platform?',
    answer: 'The platform is built with enterprise security principles, including encrypted transport, strong authentication, and audit-ready workflows.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:p-10">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">Questions teams ask before going live.</h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question} className="rounded-2xl border border-slate-200/70 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">
                <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span className="text-base font-semibold text-slate-900 dark:text-slate-50">{item.question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm leading-8 text-slate-600 dark:text-slate-300">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
