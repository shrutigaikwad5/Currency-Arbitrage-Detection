import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.mock.arbitragex.dev',
  timeout: 1000,
})

const mockSignals = [
  {
    pair: 'EUR/USD',
    spread: '+0.84%',
    risk: 'Low',
    market: 'London',
  },
  {
    pair: 'GBP/USD',
    spread: '+0.62%',
    risk: 'Medium',
    market: 'New York',
  },
  {
    pair: 'EUR/GBP',
    spread: '+0.41%',
    risk: 'Low',
    market: 'Frankfurt',
  },
]

export const fetchArbitrageSignals = async () => {
  try {
    const response = await client.get('/arbitrage-signals')
    return response.data
  } catch (error) {
    console.warn('Using mock arbitrage signals due to API unavailability.', error)
    return mockSignals
  }
}
