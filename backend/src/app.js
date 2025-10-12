import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import config from './config/index.js';

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

export default app;