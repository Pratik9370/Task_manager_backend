const express=require('express')
const connectToMongo=require("./db")
const app=express()
var cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

connectToMongo()

const allowedOrigins = [
    'http://localhost:5173'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/crud_tasks', require('./routes/crud_tasks'))




app.get("/",(req,res)=>{
    res.send("Hello Pratik")
})

app.listen(3000,()=>{
    console.log("Server is live on port 3000")
})
