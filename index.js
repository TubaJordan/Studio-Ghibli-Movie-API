const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");


const app = express();


const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://127.0.0.1:27017/jnDB", { useNewUrlParser: true, useUnifiedTopology: true });

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

app.get("/", (req, res) => {
    res.send("Welcome to my movie app!");
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

// CREATE - Allow new users to register
app.post("/users", (req, res) => {
    Users.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(400).send(`The user ${req.body.username} already exists`);
            } else {
                Users
                    .create({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        birthDate: req.body.birthDate
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send(`Error: ${err}`);
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// READ - Return a list of ALL movies to the user
app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// READ - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ title: req.params.title })
        .then((movies) => {
            if (!movies) {
                return res.status(404).send(`Error: ${req.params.title} was not found`);
            } else {
                res.status(200).json(movies);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// READ - Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/movies/genre/:genreName", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.find({ "genre.name": req.params.genreName.toLowerCase() })
        .then((movies) => {
            if (!movies) {
                return res.status(404).send(`Error: ${req.params.genreName} was not found`)
            } else {
                res.status(200).json(movies);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// READ - Return data about a director (bio, birth year, death year) by name
app.get("/movies/director/:directorName", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ "director.name": req.params.directorName })
        .then((movies) => {
            if (!movies) {
                return res.status(404).send(`Error: ${req.params.directorName} was not found`)
            } else {
                res.status(200).json(movies);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// UPDATE - Allow users to update their user info (username, password, email, date of birth)
app.put("/users/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthDate: req.body.birthDate
        }
    },
        { new: true }) //this line makes sure that the updated document is returned
        .then((user) => {
            if (!user) {
                return res.status(400).send(`Error: ${req.params.username} was not found.`);
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// UPDATE/POST - Allow users to add a movie to their list of favorites
app.post("/users/:username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
        $push: { favoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((user) => {
            if (!user) {
                return res.status(400).send(`Error: ${req.params.username} was not found.`);
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// DELETE - Allow users to remove a movie from their list of favorites
app.delete("/users/:username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
        $pull: { favoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((user) => {
            if (!user) {
                return res.status(400).send(`Error: ${req.params.username} was not found.`);
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// DELETE - Allow existing users to deregister
app.delete("/users/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`Error: ${req.params.username} was not found.`);
            } else {
                res.status(200).send(`${req.params.username} has been successfully removed from the database.`);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Something broke!`);
});

app.listen(8080, () => {
    console.log(`Your app is listening on port 8080.`)
});