require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

// Requiere las estrategias de Passport
require('./utils/passport'); // Estrategia Google
require('./utils/passportDiscord'); // Estrategia Discord
require('./utils/passportFacebook'); // Estrategia Facebook

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, // Cambia esta clave secreta por una más segura en producción
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Ruta de inicio
app.get('/', (req, res) => {
  res.send(`
    <h1>Authenticate</h1>
    <a href="/auth/google">Authenticate with Google</a><br>
    <a href="/auth/discord">Authenticate with Discord</a><br>
    <a href="/auth/facebook">Authenticate with Facebook</a>
  `);
});

// Rutas para Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Google Authentication successful!');
  }
);

// Rutas para Discord
app.get('/auth/discord',
  passport.authenticate('discord')
);

app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Discord Authentication successful!');
  }
);

// Rutas para Facebook
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Facebook Authentication successful!');
  }
);

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

