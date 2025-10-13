import { X, Clock, Users, ChefHat, Heart, Flame, Check } from 'lucide-react'
import { useState } from 'react'
import Button from '../shared/Button'
import Badge from '../shared/Badge'
import NutritionInfo from '../features/NutritionInfo'
import { useFavorites } from '../../hooks/useFavorites'

export default function RecipeDetail({ recipe, onClose }) {
  const [servings, setServings] = useState(recipe.servings)
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(recipe.id)

  const ratio = servings / recipe.servings

  return (
    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <div className="relative h-64 sm:h-80">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all"
        >
          <Heart 
            className={`w-5 h-5 transition-all ${favorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
          />
        </button>

        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-3">
            {recipe.name}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-white/90 text-slate-900">{recipe.cuisine}</Badge>
            {recipe.dietary?.filter(d => d).map(diet => (
              <Badge key={diet} className="bg-white/90 text-slate-900">{diet}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-slate-50">
            <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-slate-900">{recipe.cookingTime}</p>
            <p className="text-xs text-slate-600">minutes</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-slate-50">
            <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-slate-900">{servings}</p>
            <p className="text-xs text-slate-600">servings</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-slate-50">
            <ChefHat className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-slate-900 capitalize">{recipe.difficulty}</p>
            <p className="text-xs text-slate-600">level</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setServings(Math.max(1, servings - 1))}
          >
            -
          </Button>
          <span className="text-sm font-medium">Adjust servings</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setServings(servings + 1)}
          >
            +
          </Button>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Ingredients</h3>
          <div className="space-y-2">
            {recipe.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-medium text-slate-900">{ing.name}</span>
                  <span className="text-slate-600 ml-2">
                    {ratio !== 1 ? (
                      <span className="text-orange-600 font-medium">
                        {(parseFloat(ing.amount) * ratio).toFixed(1)}{ing.amount.replace(/[\d.]/g, '')}
                      </span>
                    ) : (
                      ing.amount
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Instructions</h3>
          <div className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="flex-1 text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {recipe.nutrition && (
          <NutritionInfo nutrition={recipe.nutrition} servings={servings} originalServings={recipe.servings} />
        )}
      </div>
    </div>
  )
}