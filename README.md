 MERN Blog Application
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, and a responsive design.

🚀 Project Overview
This is a complete blog platform that allows users to:

Register and login with secure authentication

Create, read, update, and delete blog posts

Organize posts by categories

Browse posts with pagination

Enjoy a responsive and user-friendly interface

🛠️ Tech Stack
Frontend:

React.js 18

React Router DOM

Context API for state management

Axios for API calls

Vite for build tooling

Backend:

Node.js

Express.js

MongoDB with Mongoose

JWT for authentication

bcryptjs for password hashing

express-validator for input validation

📋 Prerequisites
Before running this application, make sure you have installed:

Node.js (v18 or higher)

MongoDB (local installation or MongoDB Atlas)

npm or yarn package manager

⚡ Quick Setup
1. Clone the Repository
bash
git clone <repository-url>
cd mern-blog-app
2. Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
Edit the .env file:

env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
3. Frontend Setup
bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
Edit the .env file:

env
VITE_API_BASE_URL=http://localhost:5000/api
4. Start the Application
Terminal 1 - Backend:

bash
cd server
npm run dev
Server will run on: http://localhost:5000

Terminal 2 - Frontend:

bash
cd client
npm run dev
Client will run on: http://localhost:3000

🗄️ Database Setup
The application will automatically create the database when you start the server. Make sure MongoDB is running on your system.

Optional: Seed Sample Data
bash
cd server
node seedData.js
📚 API Documentation
Authentication Endpoints
Method	Endpoint	Description	Body
POST	/api/auth/register	Register new user	{username, email, password}
POST	/api/auth/login	Login user	{email, password}
GET	/api/auth/me	Get current user	Requires Auth Token
Posts Endpoints
Method	Endpoint	Description	Auth Required
GET	/api/posts	Get all posts (paginated)	No
GET	/api/posts/:id	Get single post	No
POST	/api/posts	Create new post	Yes
PUT	/api/posts/:id	Update post	Yes (Author only)
DELETE	/api/posts/:id	Delete post	Yes (Author only)
Categories Endpoints
Method	Endpoint	Description	Auth Required
GET	/api/categories	Get all categories	No
POST	/api/categories	Create new category	No
Request/Response Examples
Register User:

json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "user_id",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
Create Post:

json
POST /api/posts
Headers: { Authorization: "Bearer jwt_token" }
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "category": "category_id",
  "tags": "react, javascript, web-development"
}
✨ Features Implemented
✅ Core Features
User Authentication (Register, Login, Logout)

JWT-based secure authentication

CRUD Operations for blog posts

Category management

Responsive UI design

Protected routes

✅ User Interface
Homepage with application overview

Posts listing with pagination

Single post view

Create/Edit post forms

User authentication forms

Dynamic navigation based on auth state

✅ Backend Features
RESTful API design

Input validation with express-validator

Error handling middleware

Password hashing with bcryptjs

MongoDB relationships (User-Post-Category)

Pagination support

✅ Advanced Features
Context API for global state management

Custom hooks for API calls

Auto-login on page refresh

Form validation on frontend

Loading states and error handling

Optimistic UI updates

🎯 Application Structure
text
mern-blog-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React Context
│   │   └── App.jsx         # Main App component
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   └── server.js           # Server entry point
└── README.md
🖼️ Application Screenshots
![alt text](<Screenshot 2025-10-30 020556.png>)

Homepage
Clean header with navigation

Welcome section with call-to-action buttons

Feature cards highlighting application capabilities

Responsive design that works on all devices

Posts Page
Grid layout of blog posts

Post cards with title, excerpt, and metadata

Pagination controls for navigating through posts

"Create Post" button for authenticated users

Authentication Pages
Clean, centered forms for login and registration

Form validation with error messages

Links to switch between login and register

Post Management
Rich forms for creating and editing posts

Category selection dropdown

Tag input field

Content textarea with proper formatting

🔧 Environment Variables
Server (.env)
env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_secure_jwt_secret
Client (.env)
env
VITE_API_BASE_URL=http://localhost:5000/api
🚀 Deployment
Backend Deployment (Heroku/Netlify/Railway)
Set environment variables in your hosting platform

Deploy the server directory

Ensure MongoDB connection string is set

Frontend Deployment (Netlify/Vercel)
Build the project: npm run build

Deploy the dist folder

Set environment variables for API URL

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/new-feature

Commit your changes: git commit -m 'Add new feature'

Push to the branch: git push origin feature/new-feature

Submit a pull request

📝 License
This project is licensed under the MIT License.

🆘 Troubleshooting
Common Issues:
MongoDB Connection Error

Ensure MongoDB is running locally

Check MONGODB_URI in .env file

CORS Errors

Verify server and client are running on correct ports

Check proxy configuration in vite.config.js

Authentication Issues

Clear browser localStorage

Check JWT secret in server .env

Build Errors

Delete node_modules and run npm install again

Ensure Node.js version is 18+