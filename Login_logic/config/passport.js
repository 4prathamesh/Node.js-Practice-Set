const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategty;
const User = require('../models/User');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    email: profile.emails[0].value,
                    password: null,
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

module.exports = passport;