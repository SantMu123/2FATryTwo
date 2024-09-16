//utils/passport.js
require('dotenv').config();
const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET 

passport.use( 
  new GoogleStrategy( 
    { 
      clientID: googleClientId, 
      clientSecret: googleClientSecret, 
      callbackURL: `http://localhost:3000/auth/google/callback`, 
    }, 

    function (accessToken, refreshToken, profile, done) { 
      // User find or create to db 
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