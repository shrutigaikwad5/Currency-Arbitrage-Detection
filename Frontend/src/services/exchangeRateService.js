import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/api/exchange-rate',
  timeout: 10000,
})

export const syncLatestRates = async () => {
  const response = await client.post('/sync')
  return response.data
}

export const getExchangeRate = async (baseCurrency, targetCurrency) => {
  const response = await client.get('/search', {
    params: {
      baseCurrency,
      targetCurrency,
    },
  })

  return response.data
}

export const fetchExchangeRates = async () => {
  try {
    return await getExchangeRate('USD', 'INR')
  } catch (error) {
    console.warn('Falling back to local exchange-rate sample data.', error)
    return {
      rate: '86.42',
      baseCurrency: 'USD',
      targetCurrency: 'INR',
      updatedAt: new Date().toISOString(),
    }
  }
}
