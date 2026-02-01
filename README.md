# Task Management Application – Backend

This is the backend service for the **Task Management Web Application**, built as part of the **GLOBAL TREND – Full Stack Development Internship Skill Assessment**.

It provides REST APIs for user authentication and task CRUD operations with secure cookie-based authentication.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **Cookie-parser**
- **CORS**
- **dotenv**

---

## ✨ Features

- User Signup & Login
- JWT authentication using **HTTP-only cookies**
- Protected routes using middleware
- Create, Read, Update, Delete (CRUD) tasks
- Tasks linked to authenticated users
- Secure and scalable API structure

---

## 📁 Project Structure

```text
Server/
├── middleware/
│   └── fetchUser.js      # Middleware to decode JWT and fetch user ID
├── models/
│   ├── Task.js           # Mongoose schema for task data
│   └── User.js           # Mongoose schema for user data
├── routes/
│   ├── auth.js           # Routes for User Authentication
│   └── crud_tasks.js     # Routes for Task operations
├── .env                  # Environment variables (DB URI)
├── .gitignore            # Files to be ignored by Git
├── db.js                 # MongoDB connection configuration
├── index.js              # Main entry point of the server
├── package.json          # Project dependencies and scripts
└── package-lock.json     # Locked versions of dependencies



---

⚙️ Environment Variables

Create a `.env` file in the root directory and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


🔐 Authentication Flow

User logs in / signs up

JWT token is generated

Token is stored in HTTP-only cookies

fetchUser middleware verifies token from cookies

Protected routes are accessible only to authenticated users

🛠 API Routes
Auth Routes
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/getuser

Task Routes (Protected)
GET    /api/readTasks
POST   /api/createTask
PUT    /api/updateTask/:id
DELETE /api/deleteTask/:id

🧪 Testing
Postman
