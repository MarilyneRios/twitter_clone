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