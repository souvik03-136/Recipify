const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

export const recipeAPI = {
  getAll: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    )
    const query = new URLSearchParams(cleanParams).toString()
    const url = query ? `${API_BASE}/recipes?${query}` : `${API_BASE}/recipes`
    const response = await fetch(url)
    return handleResponse(response)
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/recipes/${id}`)
    return handleResponse(response)
  },

  search: async (ingredients, options = {}) => {
    const response = await fetch(`${API_BASE}/recipes/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, ...options })
    })
    return handleResponse(response)
  },

  match: async (ingredients, preferences = {}) => {
    const cleanPreferences = Object.fromEntries(
      Object.entries(preferences).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    )
    const response = await fetch(`${API_BASE}/recipes/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, preferences: cleanPreferences })
    })
    return handleResponse(response)
  },

  analyzeImage: async (imageBase64) => {
    const response = await fetch(`${API_BASE}/recipes/analyze-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 })
    })
    return handleResponse(response)
  },

  getCuisines: async () => {
    const response = await fetch(`${API_BASE}/recipes/cuisines`)
    return handleResponse(response)
  },

  getDietaryOptions: async () => {
    const response = await fetch(`${API_BASE}/recipes/dietary`)
    return handleResponse(response)
  },

  getSubstitutions: async (ingredient) => {
    const response = await fetch(`${API_BASE}/recipes/substitute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredient })
    })
    return handleResponse(response)
  }
}

export const userAPI = {
  toggleFavorite: async (recipeId, userId = 'default') => {
    const response = await fetch(`${API_BASE}/user/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, userId })
    })
    return handleResponse(response)
  },

  getFavorites: async (userId = 'default') => {
    const response = await fetch(`${API_BASE}/user/favorites?userId=${userId}`)
    return handleResponse(response)
  },

  rateRecipe: async (recipeId, rating, userId = 'default') => {
    const response = await fetch(`${API_BASE}/user/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, rating, userId })
    })
    return handleResponse(response)
  },

  getRecommendations: async (userId = 'default', limit = 10) => {
    const response = await fetch(`${API_BASE}/user/recommendations?userId=${userId}&limit=${limit}`)
    return handleResponse(response)
  }
}