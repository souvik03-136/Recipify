# 🍳 Recipe Matching Backend API

A **high-performance Node.js/Express** backend powering intelligent recipe discovery, image analysis, and personalized recommendations.

---

## 🚀 Quick Start

### 1️⃣ Clone and Install
```bash
cd backend
npm install
````

### 2️⃣ Create Environment File

Create a `.env` file in the backend root directory:

```bash
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=*
```

### 3️⃣ Start the Server

```bash
npm start
```

Server will start on `http://localhost:5000`.

---

## 🧪 Test the API

```bash
# Health check
curl http://localhost:5000/health

# Get all recipes
curl http://localhost:5000/api/recipes

# Search recipes by ingredients
curl -X POST http://localhost:5000/api/recipes/search \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["chicken","tomato","garlic"]}'
```

---

## 📚 API Endpoints

### 🔸 Recipes

| Method | Endpoint                     | Description                                         |
| :----- | :--------------------------- | :-------------------------------------------------- |
| `GET`  | `/api/recipes`               | Get all recipes (supports filters & pagination)     |
| `GET`  | `/api/recipes/:id`           | Get a recipe by its ID                              |
| `POST` | `/api/recipes/search`        | Search recipes by ingredients                       |
| `POST` | `/api/recipes/match`         | Intelligent ingredient-based recipe matching        |
| `POST` | `/api/recipes/analyze-image` | Analyze an image of ingredients using OpenAI Vision |
| `POST` | `/api/recipes/substitute`    | Get ingredient substitutions                        |
| `GET`  | `/api/recipes/cuisines`      | Fetch available cuisines                            |
| `GET`  | `/api/recipes/dietary`       | Fetch supported dietary categories                  |

### 🔸 User

| Method | Endpoint                    | Description                               |
| :----- | :-------------------------- | :---------------------------------------- |
| `POST` | `/api/user/favorites`       | Toggle favorite status for a recipe       |
| `GET`  | `/api/user/favorites`       | Retrieve user’s favorite recipes          |
| `POST` | `/api/user/ratings`         | Rate a recipe                             |
| `GET`  | `/api/user/recommendations` | Fetch personalized recipe recommendations |

---

## 🧠 Core Features

✅ **Intelligent recipe matching** — weighted scoring algorithm for better accuracy
✅ **Image analysis** — identify ingredients using OpenAI Vision API *(with fallback)*
✅ **Ingredient substitution engine** — find alternative ingredients
✅ **User system** — favorites, ratings, and preferences tracking
✅ **Personalized recommendations** — powered by user history and ratings
✅ **Nutritional analysis** — estimate macros and calories
✅ **Advanced filtering & pagination** — for large datasets
✅ **Caching layer** — improved performance and reduced latency
✅ **Robust error handling** — production-grade middleware
✅ **Modular architecture** — clean services/controllers separation
✅ **Deployment-ready** — optimized for Render, Railway, or Vercel

---

## 🏗️ Tech Stack

* **Node.js** + **Express.js**
* **OpenAI API** (Vision + Text)
* **MongoDB / PostgreSQL** *(configurable)*
* **Redis / In-memory caching**
* **JWT Authentication**
* **ES Modules + TypeScript Ready**
* **Prettier + ESLint** for clean code formatting

---

## 🚀 Deployment

Easily deploy to:

* **Render**
* **Railway**
* **Vercel**
* **AWS / GCP / Azure**

Make sure to set your environment variables in the hosting platform’s dashboard.

---

## 🧩 Project Structure

```
backend/
├── src/
│   ├── controllers/      # API route handlers
│   ├── services/         # Business logic
│   ├── models/           # Database models (Mongo/Postgres)
│   ├── routes/           # Express route definitions
│   ├── utils/            # Helper functions
│   └── app.js            # App entry point
├── tests/                # Unit/integration tests
├── .env.example
├── package.json
└── README.md
```

---

## 💡 Future Enhancements

* Meal planning & grocery list generation
* Multi-language support
* AI-powered nutrition insights
* Integration with voice assistants

---
