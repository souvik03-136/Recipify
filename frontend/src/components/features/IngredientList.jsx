import { Check, X } from 'lucide-react'

export default function IngredientList({ ingredients, availableIngredients = [] }) {
  return (
    <div className="space-y-2">
      {ingredients.map((ing, idx) => {
        const isAvailable = availableIngredients.some(avail => 
          ing.name.toLowerCase().includes(avail.toLowerCase()) ||
          avail.toLowerCase().includes(ing.name.toLowerCase())
        )

        return (
          <div 
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isAvailable ? 'bg-green-50' : 'bg-slate-50'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              isAvailable ? 'bg-green-500' : 'bg-slate-300'
            }`}>
              {isAvailable ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <X className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900">{ing.name}</span>
              <span className="text-slate-600 ml-2">{ing.amount}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}