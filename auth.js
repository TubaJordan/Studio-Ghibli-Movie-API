// JWT secret key for encoding and decoding tokens. 
// Ensure this matches with the key used in JWTStrategy.
const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
    passport = require("passport");

// Importing local passport configurations for authentication strategies.   
require("./passport");

/**
 * Generate a JWT token for a user.
 *
 * @param {Object} user - The user for whom the token is generated.
 * @returns {string} - The generated JWT token.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username, //This is the username encoded in the JWT
        expiresIn: "7d", //Specifies token will expire in 7 days
        algorithm: "HS256" //This is the algorithm used to "sign" or encode the values of the JWT
    });
}

/**
 * POST endpoint for users to login and get authenticated.
 * If successful, a JWT token is returned for the authenticated user.
 *
 * @param {Object} router - The express router object.
 */
module.exports = (router) => {
    router.post("/login", (req, res) => {
        passport.authenticate("local", { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: ("Something is not right" + error),
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}