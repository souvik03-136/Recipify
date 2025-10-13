import RecipeCard from './RecipeCard'
import Skeleton from '../shared/Skeleton'
import ErrorState from '../shared/ErrorState'

export default function RecipeGrid({ recipes, loading, error, onRecipeClick, searchIngredients = [] }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 text-lg">No recipes found. Try different filters or ingredients.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Found <span className="font-semibold text-slate-900">{recipes.length}</span> recipe{recipes.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {recipes.map(recipe => (
          <RecipeCard 
            key={recipe.id}
            recipe={recipe}
            onClick={() => onRecipeClick(recipe)}
            highlightIngredients={searchIngredients}
          />
        ))}
      </div>
    </div>
  )
}