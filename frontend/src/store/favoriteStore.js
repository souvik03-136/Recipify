const STORAGE_KEY = 'recipe_favorites'

class FavoriteStore {
  constructor() {
    this.favorites = this.loadFromStorage()
    this.listeners = []
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites))
    } catch (err) {
      console.error('Failed to save favorites:', err)
    }
  }

  getAll() {
    return [...this.favorites]
  }

  toggle(recipeId) {
    const index = this.favorites.indexOf(recipeId)
    if (index > -1) {
      this.favorites.splice(index, 1)
    } else {
      this.favorites.push(recipeId)
    }
    this.saveToStorage()
    this.notifyListeners()
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback)
    }
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.getAll()))
  }
}

export const favoriteStore = new FavoriteStore()