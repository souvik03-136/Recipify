import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateRating } from '../middleware/validator.js';

const router = express.Router();

router.post('/favorites', validateRating, userController.toggleFavorite);
router.get('/favorites', userController.getFavorites);
router.post('/ratings', validateRating, userController.rateRecipe);
router.get('/recommendations', userController.getRecommendations);

export default router;