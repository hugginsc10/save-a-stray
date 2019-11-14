
const models = require("./models");
const express = require("express");
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const FacebookStrategy = require("passport-facebook").Strategy;
const Keys = require("../config/keys");
const User = require("./models/User");
const passport = require("passport");
const facebookRegister = require("./services/auth");
const googleRegister = require("./services/auth");
const GoogleStrategy = require("passport-google").Strategy;
const app = express();







app.use(passport.initialize());


// Social Auth

passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(facebookRegister, profile);
      }
  ),
);
// passport.use(
//   new GoogleStrategy({
//       clientID: Keys.googClient,
//       clientSecret: Keys.googKey,
//       callbackURL: 'https://save-a-stray.herokuapp.com/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log(profile);
//       cb(googleRegister, profile);
//       }
//   ),
// );

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// rfq


app.use(cors());
app.use(passport.initialize());
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}
app.use(passport.session());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());


app.get('/a', () => console.log(11111111111111));
app.get('/facebooklogin', cors(), passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback', cors(),
  passport.authenticate('facebook', {
    session: false
  }), 
  (req, res) => {
    res.send(Keys.googClient)
  }

);



// router.get("/auth/facebook", passport.authenticate("facebook", 
// {scope: ['profile']})
// );

// router.get("/auth/facebook/callback",
//   passport.authenticate(("facebook"),{ failureRedirect: '/login' }), 
//   (req, res) => {
//       res.redirect("/");
//     });

// router.get("/auth/success", (req, res) => {
//   console.log("getting user data!");
//   res.send(user);
// });

// router.get("/auth/logout", (req, res) => {
//   console.log("logging out !");
//   req.logout();
//   user = {};
//   res.redirect("/");
// });

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);


// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;