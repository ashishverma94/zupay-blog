
# Zupay Blog FullStack Assignment

This project is a full-stack application with a React frontend and an Express Js backend. The frontend is a Vite React app. The backend is an Express API server that provides the necessary endpoints for the frontend to interact with. Mongodb database is used to store data.

Deployed Link : https://zupay-blog-frontend.vercel.app

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/ashishverma94/zupay-blog.git
cd zupay-blog
```

### 2. Create .env file

Create .env file in both frontend and backend folder

FRONTEND .env ( paste this variable )
```bash
VITE_BACKEND_URL = "http://localhost:3000"
```
BACKEND .env ( paste this variable and give mongo_db_url)
```bash
PORT = 3000
DB_URL = { mongo_db_url }
JWT_SECRET_KEY = dsahdfasjlkjasafdhskah
```

### 3. Run Commands

Open terminal inside both frontend and backend folder

FOR FRONTEND-
```bash
cd frontend
npm install
npm run dev
```

FOR BACKEND-
```bash
cd backend
npm install
npm run dev
```

### 4. Now your frontend and backend are running on these ports
```bash
http://localhost:5173
http://localhost:3000
```

The CI/CD pipeline has been configured to automate the deployment process for this project.

1. Frontend is deployed on vercel.
    
    https://zupay-blog-frontend.vercel.app
2. Backend is deployed on render.

     https://zupay-blog.onrender.com


## Responsiveness Showcase


