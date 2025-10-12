import { AppError } from './errorHandler.js';

export const validateRecipeSearch = (req, res, next) => {
  const { ingredients } = req.body;
  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    throw new AppError('Ingredients array is required', 400);
  }

  req.body.ingredients = ingredients.map(ing => 
    typeof ing === 'string' ? ing.toLowerCase().trim() : ing
  );

  next();
};

export const validateImageAnalysis = (req, res, next) => {
  const { image } = req.body;
  
  if (!image) {
    throw new AppError('Image data is required', 400);
  }

  if (!image.startsWith('data:image')) {
    throw new AppError('Invalid image format', 400);
  }

  next();
};

export const validateRating = (req, res, next) => {
  const { recipeId, rating } = req.body;
  
  if (!recipeId) {
    throw new AppError('Recipe ID is required', 400);
  }

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    throw new AppError('Rating must be between 1 and 5', 400);
  }

  next();
};