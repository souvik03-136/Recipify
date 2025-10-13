import { useState } from 'react'
import { recipeAPI } from '../api/client'

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (imageBase64) => {
    setLoading(true)
    setError(null)
    try {
      const response = await recipeAPI.analyzeImage(imageBase64)
      return response.data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { analyze, loading, error }
}