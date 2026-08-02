import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.mock.arbitragex.dev',
  timeout: 1000,
})

const mockPrediction = {
  confidence: '94.8%',
  outlook: 'Bullish for dislocations',
  horizon: '15 min',
}

export const fetchPrediction = async () => {
  try {
    const response = await client.get('/prediction')
    return response.data
  } catch (error) {
    console.warn('Using mock prediction data due to API unavailability.', error)
    return mockPrediction
  }
}
