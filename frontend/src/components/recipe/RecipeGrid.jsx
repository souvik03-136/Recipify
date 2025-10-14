import RecipeCard from './RecipeCard'
import Skeleton from '../shared/Skeleton'
import ErrorState from '../shared/ErrorState'

export default function RecipeGrid({ recipes, loading, error, onRecipeClick, searchIngredients = [] }) {
  console.log('RecipeGrid render:', { recipesCount: recipes?.length, loading, error })

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-6xl">🍳</div>
          <h3 className="text-2xl font-bold text-slate-900">No recipes found</h3>
          <p className="text-slate-600">
            Try adjusting your filters or search with different ingredients
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-base font-medium text-slate-900">
          Found <span className="font-bold text-orange-600">{recipes.length}</span> recipe{recipes.length !== 1 ? 's' : ''}
        </p>
        {searchIngredients.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-500">Matching:</span>
            {searchIngredients.map(ing => (
              <span key={ing} className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                {ing}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => {
          console.log(`Rendering recipe ${index}:`, recipe.name)
          return (
            <RecipeCard 
              key={recipe.id || index}
              recipe={recipe}
              onClick={() => onRecipeClick(recipe)}
              highlightIngredients={searchIngredients}
            />
          )
        })}
      </div>
    </div>
  )
}