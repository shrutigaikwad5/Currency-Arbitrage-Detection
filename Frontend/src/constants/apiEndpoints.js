export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  exchangeRate: {
    base: '/exchange-rate',
    search: '/exchange-rate/search',
    sync: '/exchange-rate/sync',
    byId: (id) => `/exchange-rate/${id}`,
  },
}
