import { useCallback, useEffect, useState } from 'react'
import { getExchangeRate, getAllExchangeRates, syncLatestRates } from '../services/exchangeRateService'

export function useExchangeRates({ baseCurrency = 'USD', targetCurrency = 'INR', autoRefresh = true, refreshIntervalMs = 30000 } = {}) {
  const [rateData, setRateData] = useState(null)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState('')

  const formatTimestamp = useCallback((value) => {
    const date = value ? new Date(value) : new Date()
    if (Number.isNaN(date.getTime())) {
      return 'Just now'
    }

    return date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }, [])

  const normalizeRate = useCallback((rawRate) => {
    if (!rawRate) {
      return null
    }

    const payload = rawRate?.data ?? rawRate
    const rateValue = payload?.rate ?? payload?.exchangeRate ?? payload?.value ?? payload?.latestRate ?? payload?.amount

    return {
      baseCurrency: payload?.baseCurrency ?? baseCurrency.toUpperCase(),
      targetCurrency: payload?.targetCurrency ?? targetCurrency.toUpperCase(),
      rate: rateValue != null ? String(rateValue) : '0.0000',
      updatedAt: payload?.updatedAt ?? payload?.updated_at ?? payload?.timestamp ?? payload?.time ?? new Date().toISOString(),
    }
  }, [baseCurrency, targetCurrency])

  const loadRate = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const [rateResponse, allRatesResponse] = await Promise.all([
        getExchangeRate(baseCurrency, targetCurrency),
        getAllExchangeRates(),
      ])

      const normalizedRate = normalizeRate(rateResponse)
      setRateData(normalizedRate)
      setHistory((prev) => {
        const nextPoint = {
          timestamp: formatTimestamp(normalizedRate?.updatedAt),
          rate: Number(normalizedRate?.rate || 0),
        }

        return [...prev, nextPoint].slice(-20)
      })

      if (Array.isArray(allRatesResponse)) {
        return
      }
    } catch (err) {
      console.error('Failed to load exchange rates:', err)
      setError('Unable to connect to backend.')
      setRateData(null)
      setHistory([])
    } finally {
      setIsLoading(false)
    }
  }, [baseCurrency, targetCurrency, formatTimestamp, normalizeRate])

  const syncRates = useCallback(async () => {
    try {
      setIsSyncing(true)
      await syncLatestRates()
      await loadRate()
    } catch (err) {
      console.error('Sync failed:', err)
      setError('Unable to connect to backend.')
    } finally {
      setIsSyncing(false)
    }
  }, [loadRate])

  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      if (!isMounted) {
        return
      }
      await syncRates()
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [syncRates])

  useEffect(() => {
    if (!autoRefresh) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      void loadRate()
    }, refreshIntervalMs)

    return () => window.clearInterval(intervalId)
  }, [autoRefresh, loadRate, refreshIntervalMs])

  return {
    rateData,
    history,
    isLoading,
    isSyncing,
    error,
    refresh: loadRate,
    sync: syncRates,
  }
}
