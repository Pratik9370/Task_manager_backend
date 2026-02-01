📌 Task Manager – Backend (Server) Setup


🔧 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Cookie-based auth
CORS


📁 Folder Structure
server/
├── middleware/
│   └── fetchUser.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── auth.js
│   └── crud_tasks.js
├── node_modules/
├── .env
├── .gitignore
├── db.js
├── index.js
├── package.json
└── package-lock.json


⚙️ Environment Variables (.env)
Create a .env file inside the server folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000


▶️ Run the Server

To start the backend server:
node index.js

Server will run on:
http://localhost:5000


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
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

🧪 Testing
Postman