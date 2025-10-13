import { Camera, Heart, ChefHat } from 'lucide-react'
import Button from '../shared/Button'

export default function Header({ onUploadClick }) {
  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold gradient-text">RecipeAI</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUploadClick}
              className="gap-2"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}