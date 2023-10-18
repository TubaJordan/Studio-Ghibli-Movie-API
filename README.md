# Movie API

A RESTful API to interact with a movie database, allowing users to access movie details, as well as user profiles which include user favorites.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Built With](#built-with)
- [Author](#author)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have **Node.js** and **npm** installed on your machine. This API uses **MongoDB** as its database, so you'll also need a MongoDB URI.

### Installation

1. **Clone the repo**:
`git clone <repository-url>`

2. **Install the dependencies**:
`cd movie_api`
`npm install`

3. **Set up your environment variables**:
You need to set up your MongoDB connection URI as an environment variable named `CONNECTION_URI`.

4. **Start the server**:
`npm start`

## API Endpoints

### General

- **GET** `/` - Welcome endpoint.
- **GET** `/documentation` - API documentation.

### Movies

- **GET** `/movies` - Retrieve all movies.
- **GET** `/movies/:title` - Retrieve a specific movie by title.
- **GET** `/movies/genre/:genreName` - Retrieve movies by genre.
- **GET** `/movies/director/:directorName` - Retrieve movies by director.

### Users

- **GET** `/users/:username` - Get user details by username.
- **POST** `/users` - Register a new user.
- **PUT** `/users/:username` - Update user details.
- **POST** `/users/:username/movies/:MovieID` - Add a movie to a user's favorites.
- **DELETE** `/users/:username/movies/:MovieID` - Remove a movie from a user's favorites.
- **DELETE** `/users/:username` - Deregister a user.

## Built With

- [**Node.js**](https://nodejs.org/)
- [**Express**](https://expressjs.com/) - `^4.18.2`
- [**Mongoose**](https://mongoosejs.com/) - `^7.3.1`
- [**bcrypt**](https://www.npmjs.com/package/bcrypt) - `^5.0.1`
- [**body-parser**](https://www.npmjs.com/package/body-parser) - `^1.20.2`
- [**cors**](https://www.npmjs.com/package/cors) - `^2.8.5`
- [**express-validator**](https://express-validator.github.io/docs/) - `^7.0.1`
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) - `^9.0.0`
- [**morgan**](https://www.npmjs.com/package/morgan) - `^1.10.0`
- [**passport**](http://www.passportjs.org/) - `^0.6.0`
- [**passport-jwt**](https://www.npmjs.com/package/passport-jwt) - `^4.0.1`
- [**passport-local**](https://www.npmjs.com/package/passport-local) - `^1.0.0`
- [**uuid**](https://www.npmjs.com/package/uuid) - `^9.0.0`

## Author

**Jordan Nelson**

## License

This project is licensed under the **ISC License**.