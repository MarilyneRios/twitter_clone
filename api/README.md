# Backend

## Routes

1. créer un dossier routes

2. créer un fichier authRoute.js

````
import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.json({
        data: "the signup endpoint",
    });
});

export default router;
````

3. index.js

````
import express from 'express';
import authRoutes from "./routes/authRoute.js"//

const app = express();

app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

// Router qui gèrent les requêtes HTTP 
app.use("/api/auth", authRoutes);  
````

4. test navigateur

> http://localhost:3000/api/auth/signup => {"data":"the signup endpoint"}

ps: **JSON Viewer Pro** permet de voir les responses JSON de manière stylisée et struturée.

5. écrire pour signin et signout puis tester

````
router.get("/signin", (req, res) => {
    res.json({
        data: "the signin endpoint",
    });
});


router.get("/signout", (req, res) => {
    res.json({
        data: "the signout endpoint",
    });
});
````

> http://localhost:3000/api/auth/signin => {"data": "the signin endpoint"}

> http://localhost:3000/api/auth/signout => {"data": "the signout endpoint"}

## controllers

1. créer le dossier controllers dans api

2. créer le fichier authController.js

3. modifier authRoute.js

````
import express from "express";
import {signin, signout, signup} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;
````

4. authController.js

````


export const signup = async (req, res, next) =>{
    res.json({
        data: "the signup endpoint",
    });
};

export const signin = async (req, res, next) =>{
    res.json({
        data: "the signin endpoint",
    });
};

export const signout = (req, res) => {
    res.json({
        data: "the signout endpoint",
    });
};
````

5. test 

http://localhost:3000/api/auth/signout => {"data": "the signout endpoint"}

pour les routes post:

> avec  l'extension thunder client :

- POST : http://localhost:3000/api/auth/signin => status 200 ok et {"data": "the signin endpoint"}

- POST : http://localhost:3000/api/auth/signup => status 200 ok et {"data": "the signup endpoint"}

## DataBase mongoDB

1. Dossier config dans api

2. db.js

````
import mongoose from 'mongoose';

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.VITE_DB_CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
};

 export default connectDB;
````

3. index.js

````
import dotenv from 'dotenv';
import connectDB from './config/db.js';
//------
dotenv.config();
connectDB();

````

4. .env à la racine du projet avec gitignore


VITE_DB_CONNECTION_STRING="votre lien de connexion mongoDB"