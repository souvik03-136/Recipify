import { useState, useEffect } from 'react'
import { recipeAPI } from '../api/client'

export function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRecipes = async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await recipeAPI.getAll(filters)
      setRecipes(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const searchByIngredients = async (ingredients, options = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await recipeAPI.match(ingredients, options)
      setRecipes(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return { recipes, loading, error, fetchRecipes, searchByIngredients }
}