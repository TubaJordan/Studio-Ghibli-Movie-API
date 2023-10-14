const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    Models = require("./models.js"),
    passportJWT = require("passport-jwt");

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

/**
 * Local Strategy for authenticating user using a username and password.
 * This strategy is used during login.
 */
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, (username, password, callback) => {
    console.log(username + " " + password);
    Users.findOne({ username: username }).exec()
        .then((user) => {
            if (!user) {
                console.log("incorrect username");
                return callback(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validatePassword(password)) {
                console.log("incorrect password");
                return callback(null, false, { message: 'Incorrect password.' });
            }

            console.log("finished");
            return callback(null, user);
        })
        .catch((error) => {
            console.log(error);
            return callback(error);
        });
}));

/**
 * JWT Strategy for extracting and verifying JWT tokens from HTTP headers.
 * This strategy is used for protected routes to ensure the user is authenticated.
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret"
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));