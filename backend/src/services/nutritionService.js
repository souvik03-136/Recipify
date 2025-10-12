export const enhanceRecipeData = (recipe) => {
  const macroPercentages = calculateMacroPercentages(recipe.nutrition);
  const healthScore = calculateHealthScore(recipe.nutrition);
  const nutritionLevel = getNutritionLevel(recipe.nutrition);

  return {
    ...recipe,
    nutritionAnalysis: {
      ...recipe.nutrition,
      macroPercentages,
      healthScore,
      level: nutritionLevel,
      perServing: calculatePerServing(recipe.nutrition, recipe.servings)
    }
  };
};

const calculateMacroPercentages = (nutrition) => {
  const totalCalories = nutrition.calories;
  const proteinCals = nutrition.protein * 4;
  const carbsCals = nutrition.carbs * 4;
  const fatCals = nutrition.fat * 9;

  return {
    protein: Math.round((proteinCals / totalCalories) * 100),
    carbs: Math.round((carbsCals / totalCalories) * 100),
    fat: Math.round((fatCals / totalCalories) * 100)
  };
};

const calculateHealthScore = (nutrition) => {
  let score = 100;

  if (nutrition.calories > 700) score -= 15;
  else if (nutrition.calories > 500) score -= 5;

  if (nutrition.sodium > 1000) score -= 20;
  else if (nutrition.sodium > 600) score -= 10;

  if (nutrition.fat > 30) score -= 15;
  else if (nutrition.fat > 20) score -= 5;

  if (nutrition.fiber > 8) score += 10;
  else if (nutrition.fiber > 5) score += 5;

  if (nutrition.protein > 30) score += 10;
  else if (nutrition.protein > 20) score += 5;

  return Math.max(0, Math.min(100, score));
};

const getNutritionLevel = (nutrition) => {
  if (nutrition.calories < 350) return 'light';
  if (nutrition.calories < 550) return 'moderate';
  return 'hearty';
};

const calculatePerServing = (nutrition, servings) => {
  return {
    calories: Math.round(nutrition.calories / servings),
    protein: Math.round(nutrition.protein / servings),
    carbs: Math.round(nutrition.carbs / servings),
    fat: Math.round(nutrition.fat / servings),
    fiber: Math.round(nutrition.fiber / servings),
    sodium: Math.round(nutrition.sodium / servings)
  };
};