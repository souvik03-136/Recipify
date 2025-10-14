import { Clock, Users, ChefHat, Heart, Flame } from 'lucide-react'
import Badge from '../shared/Badge'
import { useFavorites } from '../../hooks/useFavorites'

export default function RecipeCard({ recipe, onClick, highlightIngredients = [] }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(recipe.id)

  const matchPercentage = recipe.matchScore || recipe.intelligenceScore || 0
  const showMatch = matchPercentage > 0

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(recipe.id)
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all z-10"
        >
          <Heart 
            className={`w-5 h-5 transition-all ${favorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
          />
        </button>

        {showMatch && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium shadow-lg">
            {Math.round(matchPercentage)}% Match
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
            {recipe.name}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {recipe.cuisine}
          </Badge>
          {recipe.dietary && recipe.dietary.filter(d => d).length > 0 && 
            recipe.dietary.filter(d => d).map(diet => (
              <Badge key={diet} variant="outline" className="text-xs">
                {diet}
              </Badge>
            ))
          }
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookingTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        {recipe.nutrition && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">{recipe.nutrition.calories} cal</span>
            <span className="text-xs text-slate-500">
              P: {recipe.nutrition.protein}g · C: {recipe.nutrition.carbs}g · F: {recipe.nutrition.fat}g
            </span>
          </div>
        )}

        {recipe.missingCount > 0 && (
          <div className="text-xs text-slate-500 pt-1">
            Missing {recipe.missingCount} ingredient{recipe.missingCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}