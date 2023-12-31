const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Schema definition for movies.
 * @type {mongoose.Schema}
 */
let movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: {
        name: String,
        description: String
    },
    director: {
        name: String,
        bio: String,
        birthyear: Number,
        deathyear: Number
    },
    imageUrl: String,
    featured: Boolean
});

/**
 * Schema definition for users.
 * @type {mongoose.Schema}
 */
let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

/**
 * Static method to hash a password.
 * @param {string} password - Plain text password.
 * @returns {string} - Hashed password.
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * Method to validate a given password against the user's hashed password.
 * @param {string} password - Plain text password.
 * @returns {boolean} - True if the password matches, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Model for movies.
 * @type {mongoose.Model}
 */
let Movie = mongoose.model("Movie", movieSchema);

/**
 * Model for users.
 * @type {mongoose.Model}
 */
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;