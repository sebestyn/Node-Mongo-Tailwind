const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    // LÉTEZIK MÁR ILYEN FELHASZNÁLÓ?
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            // MÁR VAN ILYEN FELHASZNÁLÓ
            console.log("Logged in: " + currentUser.name);
            done(null, currentUser);
        } else {
            //NINCS, ÚJ FELHASZNÁLÓ MENTÉSE ADATBÁZISBA
            new User({
                googleId: profile.id,
                name: profile._json.name,
                email: profile._json.email,
                picture: profile._json.picture,
            })
                .save()
                .then((newUser) => {
                    console.log("Signed up: " + newUser.username);
                    done(null, newUser);
                });
        }
    });
};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(strategyOptions, verifyCallback));
}
