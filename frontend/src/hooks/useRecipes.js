import { useState, useEffect } from 'react'
import { recipeAPI } from '../api/client'

export function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRecipes = async (filters = {}) => {
    console.log('fetchRecipes called with filters:', filters)
    setLoading(true)
    setError(null)
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
      )
      console.log('Clean filters:', cleanFilters)
      const response = await recipeAPI.getAll(cleanFilters)
      console.log('API response:', response)
      setRecipes(response.data)
    } catch (err) {
      console.error('fetchRecipes error:', err)
      setError(err.message)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const searchByIngredients = async (ingredients, options = {}) => {
    console.log('searchByIngredients called:', { ingredients, options })
    
    if (!ingredients || ingredients.length === 0) {
      fetchRecipes(options)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const cleanOptions = Object.fromEntries(
        Object.entries(options).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
      )
      console.log('Clean options:', cleanOptions)
      const response = await recipeAPI.match(ingredients, cleanOptions)
      console.log('Match API response:', response)
      setRecipes(response.data)
    } catch (err) {
      console.error('searchByIngredients error:', err)
      setError(err.message)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('useRecipes initial mount')
    fetchRecipes()
  }, [])

  console.log('useRecipes state:', { recipesCount: recipes.length, loading, error })

  return { recipes, loading, error, fetchRecipes, searchByIngredients }
}