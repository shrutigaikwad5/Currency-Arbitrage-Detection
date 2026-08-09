import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowRight, Loader2, Repeat, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getAllExchangeRates } from '../services/exchangeRateService'
import api from '../services/api'

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'JPY', 'INR']

const formatAmount = (value) => {
  const amount = Number(value)
  if (Number.isNaN(amount)) {
    return '-'
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

const formatPercentage = (val) => {
  if (val == null || val === '') return '-'
  const num = Number(val)
  if (Number.isNaN(num)) return '-'
  // If backend returns fraction (e.g. 0.0448) convert to percent
  const asPercent = num <= 1 ? num * 100 : num
  return `${asPercent.toFixed(2)}%`
}

const getCurrencyCode = (currency) => {
  if (!currency) return ''
  if (typeof currency === 'string') return currency
  return currency.currencyCode || currency.code || ''
}

const buildRateKey = (base, target) => `${base}_${target}`

const buildRateMap = (rates) => {
  const map = new Map()
  rates.forEach((rate) => {
    const base = getCurrencyCode(rate.baseCurrency)
    const target = getCurrencyCode(rate.targetCurrency)
    if (!base || !target || base === target) return
    const value = Number(rate.rate)
    if (!Number.isNaN(value) && value > 0) {
      map.set(buildRateKey(base, target), value)
    }
  })
  return map
}

const buildSelectedRateGraph = (selectedCurrencies, rateMap) => {
  const edges = []
  selectedCurrencies.forEach((base) => {
    selectedCurrencies.forEach((target) => {
      if (base === target) return
      const rate = rateMap.get(buildRateKey(base, target))
      if (rate) {
        edges.push({
          from: base,
          to: target,
          rate,
          weight: -Math.log(rate),
        })
      }
    })
  })
  return edges
}

const detectNegativeCycle = (currencies, edges) => {
  const distance = {}
  const predecessor = {}

  currencies.forEach((currency) => {
    distance[currency] = 0
    predecessor[currency] = null
  })

  for (let i = 0; i < currencies.length - 1; i += 1) {
    let updated = false
    edges.forEach((edge) => {
      if (distance[edge.from] + edge.weight < distance[edge.to]) {
        distance[edge.to] = distance[edge.from] + edge.weight
        predecessor[edge.to] = edge.from
        updated = true
      }
    })
    if (!updated) break
  }

  for (const edge of edges) {
    if (distance[edge.from] + edge.weight < distance[edge.to]) {
      let current = edge.to
      for (let i = 0; i < currencies.length; i += 1) {
        current = predecessor[current] || current
      }
      const cycleStart = current
      const cycle = []
      do {
        cycle.push(current)
        current = predecessor[current]
      } while (current && current !== cycleStart)
      cycle.push(cycleStart)
      return cycle
    }
  }

  return null
}

const calculateCycleProfit = (cycle, rateMap, amount) => {
  if (!cycle || cycle.length < 2) return null
  let currentAmount = Number(amount)
  for (let i = 0; i < cycle.length - 1; i += 1) {
    const from = cycle[i]
    const to = cycle[i + 1]
    const rate = rateMap.get(buildRateKey(from, to))
    if (!rate) return null
    currentAmount *= rate
  }
  const profit = currentAmount - amount
  return {
    finalAmount: currentAmount,
    profit,
    profitPercentage: amount > 0 ? (profit / amount) * 100 : 0,
  }
}

export default function Arbitrage() {
  const [amount, setAmount] = useState('100')
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY'])
  const [selectedCycle, setSelectedCycle] = useState([])
  const [result, setResult] = useState(null)
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ratesError, setRatesError] = useState('')

  const hasArbitrage = result?.arbitrageFound === true || (result?.cycle && result.cycle.length > 1)

  const cyclePath = useMemo(() => {
    // prefer the user-selected cycle (closed) for display; otherwise fall back to backend result
    const closedCycle = (() => {
      if (selectedCycle && selectedCycle.length >= 2) {
        const last = selectedCycle[selectedCycle.length - 1]
        const first = selectedCycle[0]
        if (first && last === first && selectedCycle.length >= 4) {
          return selectedCycle
        }
        if (selectedCycle.length >= 3) {
          // not closed yet, tentatively close for display
          return [...selectedCycle, selectedCycle[0]]
        }
      }
      if (result?.cycle && result.cycle.length > 0) return result.cycle
      return null
    })()

    if (!closedCycle) return null
    return closedCycle.join(' → ')
  }, [result, selectedCycle])

  const chartData = useMemo(() => {
    return rates
      .filter((rate) => selectedCurrencies.includes(getCurrencyCode(rate.baseCurrency)) && selectedCurrencies.includes(getCurrencyCode(rate.targetCurrency)))
      .map((rate) => ({
        name: `${getCurrencyCode(rate.baseCurrency)}/${getCurrencyCode(rate.targetCurrency)}`,
        rate: Number(rate.rate) || 0,
      }))
  }, [rates, selectedCurrencies])

  const availableCurrencies = useMemo(() => {
    const set = new Set()
    rates.forEach((r) => {
      const b = getCurrencyCode(r.baseCurrency)
      const t = getCurrencyCode(r.targetCurrency)
      if (b) set.add(b)
      if (t) set.add(t)
    })
    return Array.from(set)
  }, [rates])

  useEffect(() => {
    // initialize a sensible default cycle once rates load
    if (availableCurrencies.length >= 3 && selectedCycle.length === 0) {
      const firstThree = availableCurrencies.slice(0, 3)
      setSelectedCycle([...firstThree, firstThree[0]])
    }
  }, [availableCurrencies])

  const visibleCycleSteps = useMemo(() => {
    // derive closed cycle for visible steps: prefer the user selection, else backend result
    let base = null
    if (selectedCycle && selectedCycle.length >= 2) {
      const last = selectedCycle[selectedCycle.length - 1]
      const first = selectedCycle[0]
      if (last === first) base = selectedCycle
      else base = [...selectedCycle, selectedCycle[0]]
    } else if (result?.cycle && result.cycle.length > 0) {
      base = result.cycle
    }
    if (!base) return []
    return base.slice(0, 4)
  }, [result, selectedCycle])

  const selectedRateMap = useMemo(() => buildRateMap(rates), [rates])

  const loadRates = async () => {
    setRatesError('')
    try {
      const data = await getAllExchangeRates()
      setRates(Array.isArray(data) ? data : [])
    } catch (err) {
      setRatesError(err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Failed to load exchange rates.')
      setRates([])
    }
  }

  const loadArbitrage = async (requestedAmount, selected = selectedCurrencies) => {
    setLoading(true)
    setError('')
    try {
      const parsedAmount = Number(requestedAmount)
      if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Enter a valid amount greater than zero.')
      }

      // Call backend arbitrage detection API using existing api helper
      const response = await api.get('/arbitrage/detect', { params: { amount: parsedAmount } })
      const data = response?.data || null

      if (!data) {
        throw new Error('Empty response from arbitrage service.')
      }

      // If backend returns an error field, surface it to the UI
      if (data.error) {
        setResult(data)
        setError(data.error)
        return
      }

      // Normalize numeric values
      const initialNum = Number(data.initialAmount)
      const finalNum = Number(data.finalAmount)
      const profitNum = Number(data.profit)
      const pctNum = data.profitPercentage == null ? null : Number(data.profitPercentage)

      const normalized = {
        ...data,
        initialAmount: Number.isFinite(initialNum) ? initialNum : parsedAmount,
        finalAmount: Number.isFinite(finalNum) ? finalNum : parsedAmount,
        profit: Number.isFinite(profitNum) ? profitNum : 0,
        profitPercentage: Number.isFinite(pctNum) ? pctNum : 0,
      }

      setResult(normalized)
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Failed to detect arbitrage.'
      setError(msg)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await loadRates()
      await loadArbitrage(amount)
    }
    initialize()
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              <Sparkles size={16} /> Arbitrage dashboard
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white">Currency arbitrage analysis</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Load exchange rates, search for negative-weight cycles with Bellman-Ford, and display the arbitrage flow.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} /> Live rates connected
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 w-full xl:max-w-6xl xl:mx-auto">
          <div className="flex items-center gap-3 text-cyan-300">
            <Repeat size={18} />
            <h2 className="text-lg font-semibold text-white">Arbitrage detection</h2>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              // Validate selected cycle: require at least 3 distinct currencies and closed cycle
              if (!selectedCycle || selectedCycle.length < 3) {
                setError('Please select at least 3 currencies to form a cycle.')
                return
              }
              // If cycle is not closed (last !== first), close it for the user
              const first = selectedCycle[0]
              const last = selectedCycle[selectedCycle.length - 1]
              if (first && last !== first) {
                setSelectedCycle((s) => [...s, first])
                // call after a short tick to ensure state updates for display
                setTimeout(() => loadArbitrage(amount), 50)
                return
              }

              loadArbitrage(amount)
            }}
            className="mt-6 space-y-4"
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <label className="block text-sm font-medium text-slate-300">
                Choose currencies
                <select
                  multiple
                  value={selectedCurrencies}
                  onChange={(event) => {
                    const options = Array.from(event.target.selectedOptions)
                    setSelectedCurrencies(options.map((option) => option.value))
                  }}
                  className="mt-2 h-40 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                >
                  {CURRENCY_OPTIONS.map((currency) => (
                    <option key={currency} value={currency} className="bg-slate-950 text-white">
                      {currency}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">Hold Ctrl/Cmd to select multiple currencies.</p>
              </label>

              <label className="block text-sm font-medium text-slate-300">
                Select Currency Cycle
                <div className="mt-2 space-y-2">
                  {selectedCycle && selectedCycle.length > 0 ? (
                    selectedCycle.map((step, idx) => (
                      <div key={`cycle-step-${idx}`} className="flex items-center gap-2">
                        <select
                          value={step}
                          onChange={(e) => {
                            const next = [...selectedCycle]
                            next[idx] = e.target.value
                            setSelectedCycle(next)
                          }}
                          className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-2 text-white outline-none"
                        >
                          <option value="">Select currency</option>
                          {availableCurrencies.map((c) => (
                            <option key={c} value={c} className="bg-slate-950 text-white">
                              {c}
                            </option>
                          ))}
                        </select>
                        {idx === selectedCycle.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedCycle.length > 1) {
                                const next = [...selectedCycle]
                                next.splice(idx, 1)
                                setSelectedCycle(next)
                              }
                            }}
                            className="rounded-full bg-rose-600 px-3 py-1 text-sm text-white"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400">No cycle selected yet.</div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCycle((s) => [...(s || []), ''])
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-400"
                    >
                      Add step
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedCycle.length >= 1) {
                          const start = selectedCycle[0]
                          setSelectedCycle((s) => {
                            if (!s || s.length === 0) return s
                            if (s[s.length - 1] === start) return s
                            return [...s, start]
                          })
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
                    >
                      Close cycle
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Select at least 3 currencies, then close the cycle by repeating the starting currency.</p>
                </div>

                <div className="mt-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Amount to simulate</p>
                  <input
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    type="number"
                    min="1"
                    step="1"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
                disabled={loading}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Detect Arbitrage'}
              </button>
              <div className="text-sm text-slate-400">
                Selected currencies: {selectedCurrencies.join(', ') || 'None'}
              </div>
            </div>
          </form>

          {error ? (
            <div className="mt-6 rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
              <div className="flex items-start gap-2">
                <AlertCircle size={18} />
                <div>
                  <p className="font-semibold">Unable to detect arbitrage</p>
                  <p className="mt-1 text-slate-200">{error}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Deployed amount</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatAmount(amount)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Detected loop</p>
              <p className="mt-2 text-2xl font-semibold text-white">{hasArbitrage ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                {result ? (
                  result.arbitrageFound ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                      <Sparkles size={16} /> Arbitrage Opportunity Found
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-sm font-medium text-rose-200">
                      <AlertCircle size={16} /> No Arbitrage Opportunity Found
                    </div>
                  )
                ) : (
                  <div className="text-slate-400">No detection yet</div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => loadArbitrage(amount)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : 'Detect Arbitrage'}
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Initial amount</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatAmount(result?.initialAmount ?? amount)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Final amount</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result ? formatAmount(result.finalAmount) : '-'}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Profit</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result ? formatAmount(result.profit) : '-'}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Profit percentage</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result ? formatPercentage(result.profitPercentage) : '-'}</p>
              </div>
            </div>

            {result?.error ? (
              <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-200">
                <div className="flex items-start gap-2">
                  <AlertCircle size={18} />
                  <div>
                    <p className="font-semibold">API error</p>
                    <p className="mt-1 text-slate-200">{result.error}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Arbitrage algorithm cycle</h3>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {visibleCycleSteps.length > 0 ? (
                visibleCycleSteps.map((step, index) => (
                  <div key={`${step}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-white">
                    <Zap size={14} />
                    <span>{step}</span>
                    {index < visibleCycleSteps.length - 1 ? <ArrowRight size={16} className="text-slate-400" /> : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">After detection, a currency loop will appear here.</p>
              )}
            </div>
            {cyclePath ? (
              <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200">
                <p className="font-medium text-white">Full cycle</p>
                <p className="mt-2 leading-7">{cyclePath}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="flex items-center gap-3 text-cyan-300">
              <TrendingUp size={18} />
              <h2 className="text-lg font-semibold text-white">Available exchange rates</h2>
            </div>
            {ratesError ? (
              <div className="mt-5 rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                {ratesError}
              </div>
            ) : null}
            <div className="mt-5 overflow-x-auto rounded-[1.75rem] border border-white/10 bg-slate-950/80">
              <table className="min-w-full divide-y divide-white/10 text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Pair</th>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-950/80">
                  {rates.length > 0 ? (
                    rates.map((rate) => (
                      <tr key={`${getCurrencyCode(rate.baseCurrency)}-${getCurrencyCode(rate.targetCurrency)}`}>
                        <td className="px-4 py-4 font-medium text-white">
                          {getCurrencyCode(rate.baseCurrency)}/{getCurrencyCode(rate.targetCurrency)}
                        </td>
                        <td className="px-4 py-4">{Number(rate.rate).toFixed(4)}</td>
                        <td className="px-4 py-4 text-slate-400">{rate.updatedAt ? new Date(rate.updatedAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-6 text-center text-slate-500">
                        No exchange rate data available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="flex items-center gap-3 text-cyan-300">
              <Sparkles size={18} />
              <h2 className="text-lg font-semibold text-white">Market trend</h2>
            </div>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 12, color: '#fff' }} />
                  <Area type="monotone" dataKey="rate" stroke="#22c55e" fill="url(#colorRate)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
