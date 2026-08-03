import { ArrowRight, Zap, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fetchPrediction } from '../services/predictionService'
import { fetchExchangeRates } from '../services/exchangeRateService'

const tickerPairs = [
  { label: 'USD/INR', value: '86.42', change: '+0.28%' },
  { label: 'EUR/USD', value: '1.0842', change: '+0.14%' },
  { label: 'GBP/USD', value: '1.2684', change: '+0.09%' },
  { label: 'JPY/USD', value: '0.0067', change: '+0.11%' },
]

export function HeroSection() {
  const [rates, setRates] = useState(null)
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [rateData, predictionData] = await Promise.all([fetchExchangeRates(), fetchPrediction()])
        setRates(rateData)
        setPrediction(predictionData)
      } catch (error) {
        console.error('Hero section data loading failed:', error)
      }
    }

    load()
  }, [])

  return (
    <section id="home" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_38%),radial-gradient(circle_at_85%_15%,_rgba(59,82,212,0.18),_transparent_26%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm dark:border-indigo-900/60 dark:bg-indigo-500/10 dark:text-indigo-300">
            <BadgeCheck size={16} />
            Real-time detection active across 14 global markets.
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-slate-50">
            Risk-neutral profit.<br />
            <span className="font-serif italic text-indigo-600 dark:text-indigo-400">Systematized.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            ArbitrageX detects profitable currency arbitrage opportunities with AI, real-time exchange rates, predictive analytics, and institutional-grade risk controls.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#cta" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-500">
              Start Trading <ArrowRight size={16} />
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
              View Dashboard
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Zap size={16} className="text-indigo-500" />
              AI signal confidence: <span className="text-slate-950 dark:text-slate-50">{prediction?.confidence || '94.8%'}</span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{prediction?.outlook || 'Bullish for dislocations'}</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-slate-500/10 to-fuchsia-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/20 dark:border-slate-800">
            <div className="mb-4 flex items-center justify-between rounded-full border border-slate-800/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Live Analysis Engine
              </div>
              <span className="text-slate-400">API-ready</span>
            </div>
            <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-800/80 p-4">
                <div className="text-sm text-slate-400">EUR/USD</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xl font-semibold text-white">1.08422</div>
                  <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-sm text-emerald-400">↑</div>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-800/80 p-4">
                <div className="text-sm text-slate-400">GBP/USD</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xl font-semibold text-white">1.09341</div>
                  <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-sm text-emerald-400">↓</div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Expected Profit</div>
                  <div className="text-2xl font-semibold text-emerald-400">+0.84%</div>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400">
                  Risk-Free Opportunity Identified
                </div>
              </div>
              <div className="mt-5 h-24 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-slate-800 to-emerald-500/20 p-3">
                <div className="flex h-full items-end gap-2">
                  {[42, 56, 68, 71, 62, 82].map((height) => (
                    <div key={height} className="flex-1 rounded-t-xl bg-gradient-to-t from-indigo-500 to-emerald-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-3 rounded-[2rem] border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800/70 dark:bg-slate-900/70">
        {tickerPairs.map((pair) => (
          <div key={pair.label} className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <div className="text-sm text-slate-500 dark:text-slate-400">{pair.label}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-xl font-semibold text-slate-900 dark:text-slate-50">{rates?.[pair.label.toLowerCase().replace('/', '')] || pair.value}</div>
              <div className="text-sm font-medium text-emerald-500">{pair.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Global Latency</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">14ms</div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Currency Pairs</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">200+</div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Daily Flow Scanned</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">$4.2B</div>
        </div>
      </div>
    </section>
  )
}
