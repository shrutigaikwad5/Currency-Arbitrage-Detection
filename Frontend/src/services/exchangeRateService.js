import api from './api'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const getAllExchangeRates = async () => {
  const response = await api.get(API_ENDPOINTS.exchangeRate.base)
  return response.data
}

export const getExchangeRate = async (baseCurrency, targetCurrency) => {
  const response = await api.get(API_ENDPOINTS.exchangeRate.search, {
    params: {
      baseCurrency,
      targetCurrency,
    },
  })

  return response.data
}

export const syncLatestRates = async () => {
  const response = await api.post(API_ENDPOINTS.exchangeRate.sync)
  return response.data
}

export const createExchangeRate = async (data) => {
  const response = await api.post(API_ENDPOINTS.exchangeRate.base, data)
  return response.data
}

export const updateExchangeRate = async (id, data) => {
  const response = await api.put(API_ENDPOINTS.exchangeRate.byId(id), data)
  return response.data
}

export const deleteExchangeRate = async (id) => {
  const response = await api.delete(API_ENDPOINTS.exchangeRate.byId(id))
  return response.data
}

export const fetchExchangeRates = async () => {
  try {
    return await getExchangeRate('USD', 'INR')
  } catch (error) {
    console.warn('Unable to connect to backend.', error)
    throw error
  }
}
