import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from "./routes/authRoute.js"

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT

// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
/*
app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});*/

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

// Router qui gèrent les requêtes HTTP 
app.use("/api/auth", authRoutes);  


