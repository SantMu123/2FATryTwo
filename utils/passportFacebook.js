//utils/passportFacebook.js
require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const facebookClientId = process.env.FACEBOOK_APP_ID
const facebookClientSecret = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: `http://localhost:3000/auth/facebook/callback`,
      profileFields: ['id', 'displayName']
    },
    function (accessToken, refreshToken, profile, done) {
      // Aquí puedes buscar o crear un usuario en tu base de datos
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
