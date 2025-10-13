import { useState, useEffect } from 'react'
import { Filter, X } from 'lucide-react'
import Button from '../shared/Button'
import { recipeAPI } from '../../api/client'

export default function RecipeFilters({ onChange }) {
  const [show, setShow] = useState(false)
  const [cuisines, setCuisines] = useState([])
  const [dietaryOptions, setDietaryOptions] = useState([])
  const [filters, setFilters] = useState({
    cuisine: '',
    dietary: '',
    difficulty: '',
    maxTime: ''
  })

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [cuisineData, dietaryData] = await Promise.all([
          recipeAPI.getCuisines(),
          recipeAPI.getDietaryOptions()
        ])
        setCuisines(cuisineData.data)
        setDietaryOptions(dietaryData.data)
      } catch (error) {
        console.error('Failed to load filter options:', error)
      }
    }
    loadOptions()
  }, [])

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onChange(newFilters)
  }

  const clearFilters = () => {
    const empty = { cuisine: '', dietary: '', difficulty: '', maxTime: '' }
    setFilters(empty)
    onChange(empty)
  }

  const activeCount = Object.values(filters).filter(v => v).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShow(!show)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-medium">
              {activeCount}
            </span>
          )}
        </Button>

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear all
          </Button>
        )}
      </div>

      {show && (
        <div className="glass-effect rounded-2xl p-6 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cuisine
              </label>
              <select
                value={filters.cuisine}
                onChange={(e) => handleChange('cuisine', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              >
                <option value="">All Cuisines</option>
                {cuisines.map(c => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dietary
              </label>
              <select
                value={filters.dietary}
                onChange={(e) => handleChange('dietary', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              >
                <option value="">All Options</option>
                {dietaryOptions.map(d => (
                  <option key={d} value={d.toLowerCase()}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Time (min)
              </label>
              <select
                value={filters.maxTime}
                onChange={(e) => handleChange('maxTime', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              >
                <option value="">Any Duration</option>
                <option value="30">Under 30 min</option>
                <option value="45">Under 45 min</option>
                <option value="60">Under 1 hour</option>
                <option value="90">Under 1.5 hours</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}