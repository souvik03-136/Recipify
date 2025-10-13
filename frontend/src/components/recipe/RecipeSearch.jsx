import { useState } from 'react'
import { Search, X, Plus } from 'lucide-react'
import Button from '../shared/Button'
import Input from '../shared/Input'

export default function RecipeSearch({ onSearch }) {
  const [ingredients, setIngredients] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase()
    if (trimmed && !ingredients.includes(trimmed)) {
      const newIngredients = [...ingredients, trimmed]
      setIngredients(newIngredients)
      setInputValue('')
      onSearch(newIngredients)
    }
  }

  const removeIngredient = (ing) => {
    const newIngredients = ingredients.filter(i => i !== ing)
    setIngredients(newIngredients)
    if (newIngredients.length === 0) {
      onSearch([])
    } else {
      onSearch(newIngredients)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add ingredients (e.g., chicken, tomato, garlic)"
            className="pl-12"
          />
        </div>
        <Button onClick={addIngredient} className="gap-2 flex-shrink-0">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map(ing => (
            <div
              key={ing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium shadow-md"
            >
              <span>{ing}</span>
              <button
                onClick={() => removeIngredient(ing)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}