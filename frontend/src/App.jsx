import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import RecipeSearch from './components/recipe/RecipeSearch'
import RecipeFilters from './components/recipe/RecipeFilters'
import RecipeGrid from './components/recipe/RecipeGrid'
import RecipeDetail from './components/recipe/RecipeDetail'
import ImageUpload from './components/features/ImageUpload'
import Modal from './components/shared/Modal'
import { useRecipes } from './hooks/useRecipes'

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [filters, setFilters] = useState({})
  const [searchIngredients, setSearchIngredients] = useState([])

  const { recipes, loading, error, fetchRecipes, searchByIngredients } = useRecipes()

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    if (searchIngredients.length > 0) {
      searchByIngredients(searchIngredients, newFilters)
    } else {
      fetchRecipes(newFilters)
    }
  }

  const handleSearch = (ingredients) => {
    setSearchIngredients(ingredients)
    if (ingredients.length === 0) {
      fetchRecipes(filters)
    } else {
      searchByIngredients(ingredients, filters)
    }
  }

  const handleImageAnalysis = (ingredients) => {
    setSearchIngredients(ingredients)
    searchByIngredients(ingredients, filters)
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header onUploadClick={() => setShowUpload(true)} />
      
      <Container>
        <div className="py-8 space-y-8">
          <div className="text-center space-y-4 pt-12 pb-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Smart Recipe Generator
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload ingredient photos or search by name to discover perfect recipes
            </p>
          </div>

          <RecipeSearch onSearch={handleSearch} />
          
          <RecipeFilters onChange={handleFilterChange} />
          
          <RecipeGrid 
            recipes={recipes}
            loading={loading}
            error={error}
            onRecipeClick={setSelectedRecipe}
            searchIngredients={searchIngredients}
          />
        </div>
      </Container>

      <Footer />

      {selectedRecipe && (
        <Modal onClose={() => setSelectedRecipe(null)}>
          <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </Modal>
      )}

      {showUpload && (
        <Modal onClose={() => setShowUpload(false)}>
          <ImageUpload onAnalysisComplete={handleImageAnalysis} />
        </Modal>
      )}
    </div>
  )
}