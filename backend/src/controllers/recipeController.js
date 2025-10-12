import * as recipeService from '../services/recipeMatchingService.js';
import * as imageService from '../services/imageAnalysisService.js';
import * as nutritionService from '../services/nutritionService.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, difficulty, cuisine, dietary, maxTime } = req.query;
    
    const filters = {
      difficulty: difficulty?.toLowerCase(),
      cuisine: cuisine?.toLowerCase(),
      dietary: dietary?.toLowerCase(),
      maxTime: maxTime ? parseInt(maxTime) : null
    };

    const result = recipeService.getFilteredRecipes(filters, parseInt(page), parseInt(limit));
    
    res.json({
      success: true,
      data: result.recipes,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getCuisines = async (req, res, next) => {
  try {
    const cuisines = recipeService.getAvailableCuisines();
    res.json({ success: true, data: cuisines });
  } catch (error) {
    next(error);
  }
};

export const getDietaryOptions = async (req, res, next) => {
  try {
    const options = recipeService.getAvailableDietaryOptions();
    res.json({ success: true, data: options });
  } catch (error) {
    next(error);
  }
};

export const searchRecipes = async (req, res, next) => {
  try {
    const { ingredients, dietary, maxTime, difficulty } = req.body;
    
    const matches = recipeService.findRecipesByIngredients(ingredients, {
      dietary,
      maxTime,
      difficulty
    });

    res.json({
      success: true,
      data: matches,
      meta: {
        totalMatches: matches.length,
        ingredients: ingredients
      }
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeImage = async (req, res, next) => {
  try {
    const { image } = req.body;
    
    const analysis = await imageService.analyzeIngredients(image);
    
    const recipes = recipeService.findRecipesByIngredients(
      analysis.ingredients,
      { confidence: analysis.confidence }
    );

    res.json({
      success: true,
      data: {
        detectedIngredients: analysis.ingredients,
        confidence: analysis.confidence,
        recipes: recipes.slice(0, 10)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = recipeService.getRecipeById(id);
    
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    const enhanced = nutritionService.enhanceRecipeData(recipe);
    
    res.json({ success: true, data: enhanced });
  } catch (error) {
    next(error);
  }
};

export const matchRecipes = async (req, res, next) => {
  try {
    const { ingredients, preferences = {} } = req.body;
    
    const matches = recipeService.intelligentMatch(ingredients, preferences);
    
    res.json({
      success: true,
      data: matches,
      meta: {
        algorithm: 'weighted-score',
        totalAnalyzed: recipeService.getRecipeCount()
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubstitutions = async (req, res, next) => {
  try {
    const { ingredient } = req.body;
    
    if (!ingredient) {
      throw new AppError('Ingredient is required', 400);
    }

    const substitutions = recipeService.getIngredientSubstitutions(ingredient);
    
    res.json({
      success: true,
      data: {
        original: ingredient,
        substitutions
      }
    });
  } catch (error) {
    next(error);
  }
};