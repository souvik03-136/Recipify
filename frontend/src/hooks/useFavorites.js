import { useState, useEffect } from 'react'
import { favoriteStore } from '../store/favoriteStore'

export function useFavorites() {
  const [favorites, setFavorites] = useState(favoriteStore.getAll())

  useEffect(() => {
    const unsubscribe = favoriteStore.subscribe(setFavorites)
    return unsubscribe
  }, [])

  const toggleFavorite = (recipeId) => {
    favoriteStore.toggle(recipeId)
  }

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId)
  }

  return { favorites, toggleFavorite, isFavorite }
}