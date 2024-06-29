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

4. .env à la racine du projet avec .gitignore


> VITE_DB_CONNECTION_STRING="votre lien de connexion mongoDB" dans .env

> .env dans .gitignore


## models

1. Créer un dossier Model

2. Créer un fichier userModel.js

````
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		profileImg: {
			type: String,
			default: "",
		},
		coverImg: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "",
		},
		likedPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tweet",
				default: [],
			},
		],
        pinnedTweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
                default: [],
            },
        ],
        
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
````

- **username** et **email** sont **uniques** pour l’**authentification**.

- **followers** et **following** comme des **tableaux** d’ID users pour modéliser les **relations entre utilisateurs**.

-  **profileImg**, **coverImg**, **bio** et **link**  pour permettre  de personnaliser le profil.

- **likedTweet**  pour connaitre les tweet aimés par le user.

- **retweetedTweets** pour connaitre les tweets retweetés.

- **pinnedTweets** pour connaitre les tweets épinglés sur son profil.
-
-


3. TweetsModel.js

````
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
        img: {
			type: String,
		},
        comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
			},
		],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: () => [],
            },
        ],
        retweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: () => [],
            },
        ],
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
                default: () => [],
            },
        ],
        hashtags: [
            {
                type: String,
                default: () => [],
            },
        ],
        
    },
    { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
````

- **user** est l’ID de l’utilisateur qui a créé le tweet.

- **text** du tweet.

- **img** du image du tweet.

- **comments** Commentaires sur le tweet.

- **likes** users qui ont aimé le tweet.

- **retweets** users qui ont retweeté le tweet.

-**hashtags** associés au tweet.

4. index.js

````
//.....

// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// to parse req.body  
app.use(express.json());

//.....
````
> **express.json()** est une **méthode intégrée** pour reconnaître l’objet de requête entrant comme un objet JSON => peut extraire les données JSON envoyées dans le corps de la requête et les convertir en un objet JavaScrip.

5. authController.js

````
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    //1 validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    //2 vérif si user existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    //3 vérif si user existe
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    //Longueur du password min 10 caractères
    if (password.length < 10) {
      return res
        .status(400)
        .json({ error: "Password must be at least 10 characters long" });
    }

    //crypter le password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // création du user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    // enregistrer un nouvel utilisateur dans votre base de données 
    if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
	res.status(500).json({ error: "Internal Server Error" });
  }
};
````

6. utils/generateToken.js

````

````