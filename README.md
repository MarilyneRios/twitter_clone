# Twitter clone

## Prévoir

- installation nodejs 
- installation git
- installation ide
- npm install -g nodemon

## les outils :

- React Router Dom
- Queries
- Mutations
- Hooks
- Setup serveur
- render

## 2 dossiers :

- api
- client


## installation frontend dans client

cd client
npm create vite@latest .

> Select a framework: » React
> Select a variant: » JavaScript

  npm install
  npm run dev

## installation backend à la racine

- npm init -y

Wrote to C:\Projets training\Twitter_Clone\api\package.json:

````
{
  "name": "api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
````

- npm install express
- npm install mongoose
- npm install jsonwebtoken bcryptjs dotenv cors cookie-parser cloudinary

> **mongoose** : un outil de modélisation d’objets MongoDB conçu pour fonctionner dans un environnement asynchrone.
> **jsonwebtoken** : une implémentation des JSON Web Tokens.
> **bcryptjs** : une bibliothèque pour vous aider à hacher les mots de passe.
> **dotenv** : un module sans dépendance qui charge les variables d’environnement d’un fichier .env dans process.env.
> **cors** : un package fournissant un middleware Connect/Express qui peut être utilisé pour activer CORS avec diverses options.
> **cookie-parser** : un middleware qui analyse les cookies attachés à l’objet de requête client.
> **cloudinary** : un service cloud qui offre une solution à l’ensemble du pipeline de gestion d’images d’une application web.

- Créer le fichier index.js

https://expressjs.com/en/starter/hello-world.html

````
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
````


Ce mettre à la racine du projet puis : **nodemon api/index.js**

> Dans le navigateur : http://localhost:3000/ => hello world

> Dans la console => server is running on port 3000# twitter_clone

### La base de l'app est prête