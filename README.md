# Smart Recipe Generator

A full-stack web application that helps users discover recipes based on available ingredients using AI-powered image analysis and intelligent recipe matching.

## Features

- **Ingredient Search**: Find recipes by typing ingredient names
- **Image Analysis**: Upload photos of ingredients for automatic detection (powered by OpenAI GPT-4)
- **Smart Matching**: Intelligent recipe scoring algorithm considers ingredient availability, difficulty, cook time, and nutrition
- **Advanced Filters**: Filter by cuisine, dietary requirements, difficulty, and cooking time
- **Favorites System**: Save and manage favorite recipes with local storage
- **Responsive Design**: Beautiful UI with Tailwind CSS, works seamlessly on all devices
- **Nutrition Information**: Detailed nutritional breakdown with adjustable servings

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for state management

**Backend:**
- Node.js with Express
- OpenAI GPT-4 Vision API for image analysis
- In-memory recipe database with JSON
- Node-cache for performance optimization

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/souvik03-136/Recipify.git
cd Recipify
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Configure environment variables

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start backend server (from backend directory):
```bash
npm run dev
```

2. Start frontend dev server (from frontend directory):
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes with pagination and filters
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes/search` - Search recipes by ingredients
- `POST /api/recipes/match` - Intelligent recipe matching
- `POST /api/recipes/analyze-image` - Analyze ingredient image
- `GET /api/recipes/cuisines` - Get available cuisines
- `GET /api/recipes/dietary` - Get dietary options
- `POST /api/recipes/substitute` - Get ingredient substitutions

### User
- `POST /api/user/favorites` - Toggle favorite recipe
- `GET /api/user/favorites` - Get user favorites
- `POST /api/user/ratings` - Rate a recipe
- `GET /api/user/recommendations` - Get personalized recommendations

## Key Features Explained

### Intelligent Recipe Matching Algorithm
The backend uses a sophisticated weighted scoring system that considers:
- **Ingredient Match** (40%): How many user ingredients are in the recipe
- **Missing Penalty** (25%): Penalizes recipes with many missing ingredients
- **Difficulty** (15%): Prioritizes easier recipes
- **Time** (10%): Favors quicker cooking times
- **Nutrition** (10%): Rewards healthier options

### Image Analysis
- Uses OpenAI GPT-4 Vision API to identify ingredients from photos
- Fallback system provides demo functionality without API key
- Base64 image encoding for secure transmission

### Caching Strategy
- Node-cache implementation for frequently accessed data
- 10-minute TTL (Time To Live) for optimal performance
- Automatic cache invalidation

## Testing

Backend includes `api-tests.http` file for testing all endpoints with REST Client or similar tools.

## Performance Optimizations

- Lazy loading of recipe images
- Debounced search and filter inputs
- Memoized component rendering
- Server-side caching with node-cache
- Optimized bundle size with Vite

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Known Limitations

- Image analysis requires OpenAI API key (fallback mode available)
- Recipe database is in-memory (not persistent across restarts)
- User data stored in browser localStorage (no backend persistence)

## Future Enhancements

- User authentication and profiles
- Recipe creation and submission
- Social sharing features
- Shopping list generation
- Meal planning calendar
- Mobile app versions
