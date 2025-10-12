import { AppError } from '../middleware/errorHandler.js';
import { cache } from '../utils/cache.js';
import * as recipeService from '../services/recipeMatchingService.js';

const userFavorites = new Map();
const userRatings = new Map();

export const toggleFavorite = async (req, res, next) => {
  try {
    const { recipeId, userId = 'default' } = req.body;
    
    if (!userFavorites.has(userId)) {
      userFavorites.set(userId, new Set());
    }

    const favorites = userFavorites.get(userId);
    const isFavorited = favorites.has(recipeId);

    if (isFavorited) {
      favorites.delete(recipeId);
    } else {
      favorites.add(recipeId);
    }

    res.json({
      success: true,
      data: {
        recipeId,
        isFavorited: !isFavorited,
        totalFavorites: favorites.size
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const { userId = 'default' } = req.query;
    
    const favorites = userFavorites.get(userId) || new Set();
    const recipeIds = Array.from(favorites);
    
    const recipes = recipeIds.map(id => recipeService.getRecipeById(id)).filter(Boolean);

    res.json({
      success: true,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};

export const rateRecipe = async (req, res, next) => {
  try {
    const { recipeId, rating, userId = 'default' } = req.body;
    
    const key = `${userId}-${recipeId}`;
    userRatings.set(key, { rating, timestamp: Date.now() });

    res.json({
      success: true,
      data: { recipeId, rating }
    });
  } catch (error) {
    next(error);
  }
};

export const getRecommendations = async (req, res, next) => {
  try {
    const { userId = 'default', limit = 10 } = req.query;
    
    const favorites = userFavorites.get(userId) || new Set();
    const favoriteRecipes = Array.from(favorites)
      .map(id => recipeService.getRecipeById(id))
      .filter(Boolean);

    if (favoriteRecipes.length === 0) {
      const popular = recipeService.getPopularRecipes(parseInt(limit));
      return res.json({ success: true, data: popular });
    }

    const recommendations = recipeService.getRecommendations(favoriteRecipes, parseInt(limit));

    res.json({
      success: true,
      data: recommendations,
      meta: { basedOn: favoriteRecipes.length }
    });
  } catch (error) {
    next(error);
  }
};