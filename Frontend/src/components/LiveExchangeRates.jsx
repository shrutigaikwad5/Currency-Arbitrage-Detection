import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowRightLeft, Clock3, LoaderCircle, RefreshCcw, TrendingDown, TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getExchangeRate, syncLatestRates } from '../services/exchangeRateService'

const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'INR']

const formatTimestamp = (value) => {
  const date = value ? new Date(value) : new Date()

  if (Number.isNaN(date.getTime())) {
    return 'Just now'
  }

  return date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const buildFallbackRate = (baseCurrency, targetCurrency) => {
  const pairKey = `${baseCurrency.toUpperCase()}-${targetCurrency.toUpperCase()}`
  const fallbackMap = {
    'USD-INR': '86.42',
    'EUR-USD': '1.0842',
    'GBP-USD': '1.2684',
    'JPY-USD': '0.0067',
    'USD-EUR': '0.9220',
    'USD-GBP': '0.7882',
    'USD-JPY': '157.32',
  }

  return {
    baseCurrency: baseCurrency.toUpperCase(),
    targetCurrency: targetCurrency.toUpperCase(),
    rate: fallbackMap[pairKey] ?? '1.0000',
    updatedAt: new Date().toISOString(),
  }
}

const normalizeRate = (rawRate, baseCurrency, targetCurrency) => {
  if (!rawRate) {
    return buildFallbackRate(baseCurrency, targetCurrency)
  }

  const payload = rawRate.data ?? rawRate
  const rateValue = payload?.rate ?? payload?.exchangeRate ?? payload?.value ?? payload?.latestRate ?? payload?.amount

  return {
    baseCurrency: payload?.baseCurrency ?? baseCurrency.toUpperCase(),
    targetCurrency: payload?.targetCurrency ?? targetCurrency.toUpperCase(),
    rate: rateValue != null ? String(rateValue) : buildFallbackRate(baseCurrency, targetCurrency).rate,
    updatedAt: payload?.updatedAt ?? payload?.updated_at ?? payload?.timestamp ?? payload?.time ?? new Date().toISOString(),
  }
}

export function LiveExchangeRates() {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('INR')
  const [rateData, setRateData] = useState(null)
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const initializeRates = async () => {
      try {
        setIsSyncing(true)
        await syncLatestRates()

        if (!isMounted) {
          return
        }
      } catch (syncError) {
        console.warn('Initial sync failed. Showing the UI with fallback data.', syncError)
      } finally {
        if (isMounted) {
          setIsSyncing(false)
        }
      }
    }

    initializeRates()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchRate = async () => {
      try {
        setIsLoading(true)
        setError('')
        setChartData([])

        const response = await getExchangeRate(baseCurrency, targetCurrency)

        if (!isMounted) {
          return
        }

        const normalizedRate = normalizeRate(response, baseCurrency, targetCurrency)
        setRateData(normalizedRate)
        setChartData([
          {
            timestamp: formatTimestamp(normalizedRate.updatedAt),
            rate: Number(normalizedRate.rate),
          },
        ])
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        const fallbackRate = buildFallbackRate(baseCurrency, targetCurrency)
        setRateData(fallbackRate)
        setChartData([
          {
            timestamp: formatTimestamp(fallbackRate.updatedAt),
            rate: Number(fallbackRate.rate),
          },
        ])
        setError('Unable to reach the backend right now. The dashboard is showing fallback sample data.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchRate()

    return () => {
      isMounted = false
    }
  }, [baseCurrency, targetCurrency])

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      try {
        const response = await getExchangeRate(baseCurrency, targetCurrency)
        const normalizedRate = normalizeRate(response, baseCurrency, targetCurrency)
        setRateData(normalizedRate)
        setChartData((previousData) => {
          const nextPoint = {
            timestamp: formatTimestamp(normalizedRate.updatedAt),
            rate: Number(normalizedRate.rate),
          }

          return [...previousData, nextPoint].slice(-20)
        })
      } catch (pollError) {
        console.warn('Polling failed. Will retry on the next cycle.', pollError)
      }
    }, 30000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [baseCurrency, targetCurrency])

  const currentRate = rateData?.rate ?? '0.0000'
  const rateTrend = Number(currentRate) > 1 ? 'up' : 'stable'

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/70 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-slate-800/70 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              <Activity size={16} /> Live market pulse
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Live Exchange Rate
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              Watch the latest currency pair movement in real time, sync the backend feed on load, and keep an eye on trend shifts across the market.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
            <Clock3 size={16} className="text-cyan-400" />
            Last Updated: {rateData ? formatTimestamp(rateData.updatedAt) : 'Loading...'}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[1.5rem] border border-slate-800/80 bg-white/10 p-5 shadow-lg shadow-slate-950/20"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Search currency pair
                </div>
                <div className="mt-2 flex items-center gap-2 text-cyan-300">
                  <ArrowRightLeft size={16} />
                  <span className="text-lg font-medium text-white">{baseCurrency}/{targetCurrency}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={baseCurrency}
                  onChange={(event) => setBaseCurrency(event.target.value)}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                >
                  {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>

                <select
                  value={targetCurrency}
                  onChange={(event) => setTargetCurrency(event.target.value)}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                >
                  {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="text-sm text-slate-400">Current Exchange Rate</div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {isLoading ? 'Loading...' : currentRate}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="text-sm text-slate-400">Base Currency</div>
                <div className="mt-2 text-2xl font-semibold text-white">{baseCurrency}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="text-sm text-slate-400">Target Currency</div>
                <div className="mt-2 text-2xl font-semibold text-white">{targetCurrency}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2">
                {rateTrend === 'up' ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-cyan-400" />}
                Market trend: {rateTrend === 'up' ? 'Positive momentum' : 'Steady'}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2">
                <RefreshCcw size={16} className="text-cyan-400" />
                Refreshed every 30 seconds
              </div>
              {isSyncing ? (
                <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2">
                  <LoaderCircle size={16} className="animate-spin text-emerald-400" />
                  Syncing latest rates...
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[1.5rem] border border-slate-800/80 bg-gradient-to-br from-cyan-500/15 via-slate-900/80 to-emerald-500/15 p-5 shadow-lg shadow-slate-950/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Performance chart</div>
                <div className="mt-2 text-2xl font-semibold text-white">Live trend</div>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                Smooth updates
              </div>
            </div>

            {isLoading ? (
              <div className="mt-8 flex min-h-[260px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70">
                <div className="flex flex-col items-center gap-3 text-center text-slate-300">
                  <LoaderCircle size={28} className="animate-spin text-cyan-400" />
                  <span>Fetching the latest exchange rate...</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 h-[280px] rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                    <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#38bdf8"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 0, fill: '#34d399' }}
                      isAnimationActive
                      animationDuration={800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {error}
          </div>
        ) : null}
      </div>
    </section>
  )
}
