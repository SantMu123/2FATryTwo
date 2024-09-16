# AuthGoogleTry

Una aplicación simple para probar autenticación usando Google, Discord y Facebook con Passport.js en una aplicación Express.

## Descripción

Este proyecto demuestra cómo integrar estrategias de autenticación con Google, Discord y Facebook en una aplicación Express utilizando Passport.js. La aplicación permite autenticar usuarios con estos proveedores y redirigirlos a una página de éxito tras la autenticación.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/authgoogletry.git
   cd authgoogletry
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto y agrega tus claves secretas para las sesiones y credenciales de los proveedores de autenticación. Ejemplo:

   ```env
   SESSION_SECRET=your-session-secret

   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret

   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   ```

## Uso

1. **Inicia la aplicación**:

   ```bash
   npm run dev
   ```

   La aplicación se ejecutará en `http://localhost:3000`.

2. **Prueba las estrategias de autenticación**:

   Abre tu navegador y navega a `http://localhost:3000`. Verás enlaces para autenticarte con Google, Discord y Facebook. Haz clic en cualquiera de los enlaces para iniciar el proceso de autenticación con el proveedor correspondiente.

## Estrategias de Autenticación

### Google

#### Código: `utils/passport.js`

```javascript
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
      // Aquí se puede buscar o crear un usuario en la base de datos
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
```

**Descripción:**

1. **Carga de Variables de Entorno**: Se cargan las variables de entorno usando `dotenv`.
2. **Estrategia de Google**: Se configura la estrategia de autenticación con Google usando `passport-google-oauth20`.
   - `clientID` y `clientSecret`: Se obtienen de las variables de entorno.
   - `callbackURL`: La URL a la que Google redirige después de la autenticación.
3. **Función de Verificación**: En la función de verificación (`function (accessToken, refreshToken, profile, done)`), puedes buscar o crear un usuario en tu base de datos. Aquí solo se pasa el perfil.
4. **Serialización y Deserialización**: `serializeUser` y `deserializeUser` son responsables de almacenar y recuperar el usuario en la sesión.

### Discord

#### Código: `utils/passportDiscord.js`

```javascript
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
      scope: ['identify', 'email'] // Los scopes necesarios para autenticar al usuario
    },
    function (accessToken, refreshToken, profile, done) {
      // Aquí se puede buscar o crear un usuario en la base de datos
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
```

**Descripción:**

1. **Carga de Variables de Entorno**: Se cargan las variables de entorno usando `dotenv`.
2. **Estrategia de Discord**: Se configura la estrategia de autenticación con Discord usando `passport-discord`.
   - `clientID` y `clientSecret`: Se obtienen de las variables de entorno.
   - `callbackURL`: La URL a la que Discord redirige después de la autenticación.
   - `scope`: Los permisos necesarios para la autenticación (identidad y correo electrónico).
3. **Función de Verificación**: Similar a la estrategia de Google, esta función maneja el perfil del usuario.
4. **Serialización y Deserialización**: `serializeUser` y `deserializeUser` gestionan el almacenamiento y recuperación del usuario en la sesión.

### Facebook

#### Código: `utils/passportFacebook.js`

```javascript
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
      profileFields: ['id', 'displayName'] // Campos del perfil que se desean obtener
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
```

**Descripción:**

1. **Carga de Variables de Entorno**: Se cargan las variables de entorno usando `dotenv`.
2. **Estrategia de Facebook**: Se configura la estrategia de autenticación con Facebook usando `passport-facebook`.
   - `clientID` y `clientSecret`: Se obtienen de las variables de entorno.
   - `callbackURL`: La URL a la que Facebook redirige después de la autenticación.
   - `profileFields`: Campos del perfil que se desean obtener (ID y nombre).
3. **Función de Verificación**: Similar a las otras estrategias, esta función maneja el perfil del usuario.
4. **Serialización y Deserialización**: `serializeUser` y `deserializeUser` gestionan el almacenamiento y recuperación del usuario en la sesión.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC. Consulta el archivo [LICENSE](LICENSE) para más detalles.
