//utils/passportDiscord.js
require('dotenv').config();
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

passport.use(
  new DiscordStrategy(
    {
      clientID: discordClientId,
      clientSecret: discordClientSecret,
      callbackURL: `http://localhost:3000/auth/discord/callback`,
      scope: ['identify', 'email'] // Los scopes que necesitas para autenticar al usuario
    },

    function (accessToken, refreshToken, profile, done) {
      // Aquí manejas el perfil del usuario
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
