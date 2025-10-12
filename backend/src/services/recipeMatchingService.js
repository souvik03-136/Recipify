import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cache } from '../utils/cache.js';
import { normalizeIngredient, calculateSimilarity } from '../utils/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let recipesData = [];

const loadRecipes = () => {
  if (recipesData.length > 0) return recipesData;
  
  const dataPath = path.join(__dirname, '../../data/recipes.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  recipesData = JSON.parse(rawData);
  
  recipesData.forEach(recipe => {
    recipe.ingredientNames = recipe.ingredients.map(ing => 
      normalizeIngredient(ing.name)
    );
  });
  
  return recipesData;
};

loadRecipes();

export const getRecipeCount = () => recipesData.length;

export const getRecipeById = (id) => {
  return recipesData.find(recipe => recipe.id === id);
};

export const getAvailableCuisines = () => {
  const cuisines = [...new Set(recipesData.map(r => r.cuisine))];
  return cuisines.sort();
};

export const getAvailableDietaryOptions = () => {
  const options = new Set();
  recipesData.forEach(recipe => {
    recipe.dietary.forEach(opt => {
      if (opt) options.add(opt);
    });
  });
  return Array.from(options).sort();
};

export const getFilteredRecipes = (filters, page = 1, limit = 12) => {
  let filtered = [...recipesData];

  if (filters.difficulty) {
    filtered = filtered.filter(r => r.difficulty === filters.difficulty);
  }

  if (filters.cuisine) {
    filtered = filtered.filter(r => 
      r.cuisine.toLowerCase() === filters.cuisine
    );
  }

  if (filters.dietary) {
    filtered = filtered.filter(r => 
      r.dietary.some(d => d.toLowerCase() === filters.dietary)
    );
  }

  if (filters.maxTime) {
    filtered = filtered.filter(r => r.cookingTime <= filters.maxTime);
  }

  const totalPages = Math.ceil(filtered.length / limit);
  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;

  return {
    recipes: filtered.slice(startIdx, endIdx),
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: filtered.length,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

export const findRecipesByIngredients = (userIngredients, options = {}) => {
  const normalizedUser = userIngredients.map(normalizeIngredient);
  
  const matches = recipesData.map(recipe => {
    const matchedIngredients = recipe.ingredientNames.filter(ing =>
      normalizedUser.some(userIng => {
        if (ing.includes(userIng) || userIng.includes(ing)) return true;
        return calculateSimilarity(ing, userIng) > 0.7;
      })
    );

    const matchPercentage = (matchedIngredients.length / recipe.ingredients.length) * 100;
    const missingCount = recipe.ingredients.length - matchedIngredients.length;

    return {
      ...recipe,
      matchScore: matchPercentage,
      matchedCount: matchedIngredients.length,
      totalIngredients: recipe.ingredients.length,
      missingCount,
      missingIngredients: recipe.ingredients
        .filter(ing => !matchedIngredients.includes(normalizeIngredient(ing.name)))
        .map(ing => ing.name)
    };
  });

  let filtered = matches.filter(m => m.matchScore > 20);

  if (options.dietary) {
    filtered = filtered.filter(r => 
      r.dietary.some(d => d.toLowerCase() === options.dietary.toLowerCase())
    );
  }

  if (options.maxTime) {
    filtered = filtered.filter(r => r.cookingTime <= options.maxTime);
  }

  if (options.difficulty) {
    filtered = filtered.filter(r => r.difficulty === options.difficulty);
  }

  filtered.sort((a, b) => {
    if (Math.abs(a.matchScore - b.matchScore) > 5) {
      return b.matchScore - a.matchScore;
    }
    return a.missingCount - b.missingCount;
  });

  return filtered.slice(0, 20);
};

export const intelligentMatch = (ingredients, preferences = {}) => {
  const normalizedUser = ingredients.map(normalizeIngredient);
  
  const scored = recipesData.map(recipe => {
    let score = 0;
    const weights = {
      ingredientMatch: 40,
      missingPenalty: 25,
      difficulty: 15,
      time: 10,
      nutrition: 10
    };

    const matchedIngredients = recipe.ingredientNames.filter(ing =>
      normalizedUser.some(userIng => {
        if (ing.includes(userIng) || userIng.includes(ing)) return true;
        return calculateSimilarity(ing, userIng) > 0.7;
      })
    );

    const matchRatio = matchedIngredients.length / recipe.ingredients.length;
    score += matchRatio * weights.ingredientMatch;

    const missingRatio = (recipe.ingredients.length - matchedIngredients.length) / recipe.ingredients.length;
    score -= missingRatio * weights.missingPenalty;

    const difficultyScore = {
      'easy': 1.0,
      'medium': 0.7,
      'hard': 0.4
    };
    score += (difficultyScore[recipe.difficulty] || 0.5) * weights.difficulty;

    if (recipe.cookingTime <= 30) score += weights.time;
    else if (recipe.cookingTime <= 60) score += weights.time * 0.5;

    if (recipe.nutrition.calories < 500) score += weights.nutrition * 0.8;
    if (recipe.nutrition.protein > 25) score += weights.nutrition * 0.2;

    if (preferences.dietary) {
      const hasDietary = recipe.dietary.some(d => 
        d.toLowerCase() === preferences.dietary.toLowerCase()
      );
      if (hasDietary) score += 15;
      else score = 0;
    }

    return {
      ...recipe,
      intelligenceScore: Math.round(score * 10) / 10,
      matchedCount: matchedIngredients.length,
      totalIngredients: recipe.ingredients.length,
      missingCount: recipe.ingredients.length - matchedIngredients.length,
      missingIngredients: recipe.ingredients
        .filter(ing => !matchedIngredients.includes(normalizeIngredient(ing.name)))
        .map(ing => ing.name)
    };
  });

  const filtered = scored.filter(r => r.intelligenceScore > 15);
  filtered.sort((a, b) => b.intelligenceScore - a.intelligenceScore);

  return filtered.slice(0, 15);
};

export const getIngredientSubstitutions = (ingredient) => {
  const substitutionMap = {
    'butter': ['margarine', 'coconut oil', 'olive oil', 'ghee'],
    'milk': ['almond milk', 'soy milk', 'oat milk', 'coconut milk'],
    'egg': ['flax egg', 'chia egg', 'applesauce', 'mashed banana'],
    'flour': ['almond flour', 'coconut flour', 'oat flour', 'rice flour'],
    'sugar': ['honey', 'maple syrup', 'agave nectar', 'stevia'],
    'soy sauce': ['tamari', 'coconut aminos', 'worcestershire sauce'],
    'yogurt': ['sour cream', 'greek yogurt', 'coconut yogurt'],
    'cream': ['coconut cream', 'cashew cream', 'evaporated milk'],
    'cheese': ['nutritional yeast', 'cashew cheese', 'tofu'],
    'chicken': ['tofu', 'tempeh', 'seitan', 'chickpeas'],
    'beef': ['lentils', 'mushrooms', 'black beans', 'jackfruit'],
    'bacon': ['tempeh bacon', 'coconut bacon', 'turkey bacon'],
    'parmesan': ['pecorino', 'grana padano', 'nutritional yeast']
  };

  const normalized = normalizeIngredient(ingredient);
  
  for (const [key, subs] of Object.entries(substitutionMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return subs.map(sub => ({
        name: sub,
        category: 'direct',
        confidence: 0.9
      }));
    }
  }

  return [];
};

export const getPopularRecipes = (limit = 10) => {
  const popular = [...recipesData]
    .sort((a, b) => {
      const scoreA = (a.difficulty === 'easy' ? 10 : 0) + 
                    (a.cookingTime < 30 ? 5 : 0);
      const scoreB = (b.difficulty === 'easy' ? 10 : 0) + 
                    (b.cookingTime < 30 ? 5 : 0);
      return scoreB - scoreA;
    });

  return popular.slice(0, limit);
};

export const getRecommendations = (favoriteRecipes, limit = 10) => {
  const favoriteCuisines = favoriteRecipes.map(r => r.cuisine);
  const favoriteDietary = new Set();
  favoriteRecipes.forEach(r => r.dietary.forEach(d => favoriteDietary.add(d)));

  const recommendations = recipesData
    .filter(recipe => !favoriteRecipes.some(fav => fav.id === recipe.id))
    .map(recipe => {
      let score = 0;

      if (favoriteCuisines.includes(recipe.cuisine)) score += 30;

      recipe.dietary.forEach(d => {
        if (favoriteDietary.has(d)) score += 20;
      });

      if (recipe.difficulty === 'easy') score += 10;
      if (recipe.cookingTime < 40) score += 5;

      return { ...recipe, recommendationScore: score };
    });

  recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

  return recommendations.slice(0, limit);
};