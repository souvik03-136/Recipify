import { Flame, Activity } from 'lucide-react'

export default function NutritionInfo({ nutrition, servings = 1, originalServings = 1 }) {
  const ratio = servings / originalServings

  const adjusted = {
    calories: Math.round(nutrition.calories * ratio),
    protein: Math.round(nutrition.protein * ratio),
    carbs: Math.round(nutrition.carbs * ratio),
    fat: Math.round(nutrition.fat * ratio),
    fiber: Math.round(nutrition.fiber * ratio),
    sodium: Math.round(nutrition.sodium * ratio)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-orange-500" />
        <h3 className="text-xl font-bold text-slate-900">Nutrition Facts</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-slate-700">Calories</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{adjusted.calories}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-700 block mb-2">Protein</span>
          <p className="text-3xl font-bold text-slate-900">{adjusted.protein}g</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-700 block mb-2">Carbs</span>
          <p className="text-3xl font-bold text-slate-900">{adjusted.carbs}g</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-700 block mb-2">Fat</span>
          <p className="text-3xl font-bold text-slate-900">{adjusted.fat}g</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-700 block mb-2">Fiber</span>
          <p className="text-3xl font-bold text-slate-900">{adjusted.fiber}g</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-700 block mb-2">Sodium</span>
          <p className="text-3xl font-bold text-slate-900">{adjusted.sodium}mg</p>
        </div>
      </div>
    </div>
  )
}