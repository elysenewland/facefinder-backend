# FaceFinder Backend

## Overview
Creates a server and PostgreSQL database connection to ensure functionality of the FaceFinder Frontend.

## Features
* Creates a server (via Express.js) to provide routing for home, sign in, register, profile, image, and imageurl routes
* Utilizes bcrypt to hash passwords for improved security on sign in and register routes
* Connects with a PostgreSQL database to store user data via Knex.js

## Project Setup 

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm start
```

## Compile and Minify for Production

```sh
npm run build
```

## Dependencies
* [node.js](https://nodejs.org/en)
* [node.bcrypt.js](https://www.npmjs.com/package/bcrypt)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [Clarifai API](https://www.clarifai.com/)
* [cors](https://www.npmjs.com/package/cors)
* [Express.js](https://expressjs.com/)
* [Knex.js](https://knexjs.org/)
* [Node.postgres (pg)](https://www.npmjs.com/package/pg)

## Other Factors
* You must add your own API key in the controllers/image.js file to connect to Clarifai API
* You can get your Clarifai API key [here](https://www.clarifai.com/) 
* Add your own database credentials starting at server.js line 12
* Make sure you use PostgreSQL for this code base
* If a Mac user, you can use [Postico 2](https://eggerapps.at/postico2/) database app for PostgreSQL database
* Use [Postman](https://www.postman.com/) platform to test your routes.
