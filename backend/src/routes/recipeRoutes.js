import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import { validateRecipeSearch, validateImageAnalysis } from '../middleware/validator.js';

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.get('/cuisines', recipeController.getCuisines);
router.get('/dietary', recipeController.getDietaryOptions);
router.post('/search', validateRecipeSearch, recipeController.searchRecipes);
router.post('/analyze-image', validateImageAnalysis, recipeController.analyzeImage);
router.get('/:id', recipeController.getRecipeById);
router.post('/match', validateRecipeSearch, recipeController.matchRecipes);
router.post('/substitute', recipeController.getSubstitutions);

export default router;