const models = require("./models");
const express = require("express");
const app = express();
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
const GoogleStrategy = require("passport-google").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const chalk = require("chalk");

const router = express.Router();

let baseUrl = "";


app.use(cors());

app.use(
  "/graphql",
  expressGraphQL( req => {
    return {
    schema,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
    };
  })
  );

app.use(passport.initialize());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.use(bodyParser.json());

passport.serializeUser((user, cb ) => {cb(null, user);});

passport.deserializeUser((obj, cb) => {cb(null, obj);});





// Social Auth

passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate(...(err, user) => {
        if (err) { return cb(err);}
        cb(null, user);
      });
     
    },
  ),
);
passport.use(
  new GoogleStrategy({
      clientID: Keys.googClient,
      clientSecret: Keys.googKey,
      callbackURL: 'https://save-a-stray.herokuapp.com/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User.findOrCreate(...(err, user) => {
        if (err) { return cb(err);}
        cb(null, user);
      });
    },
  ),
);

// passport.use(
//   new TwitterStrategy({
//       clientID: Keys.TWITTER.clientId,
//       clientSecret: Keys.TWITTER.clientSecret,
//       callbackURL: 'https://save-a-stray.herokuapp.com/auth/twitter/callback',
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log(chalk.blue(JSON.stringify(profile)));
//       User.findOrCreate({twitterId: profile.id }, (err, user) => {
//         return cb(err, user);
//       })
//     },
//   ),
// );

// passport.use(
//   new AmazonStrategy({
//       clientID: Keys.AMAZON.clientId,
//       clientSecret: Keys.AMAZON.clientSecret,
//       callbackURL: 'https://save-a-stray.herokuapp.com/auth/amazon/callback',
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log(chalk.blue(JSON.stringify(profile)));
//       User.findOrCreate({ amazonId: profile.id }, (err,user) => {
//         return cb(err, user);
//       })
//     },
//   ),
// );

// AMZN routes
router.get("/auth/amazon", passport.authenticate("amazon", 
{scope: ["profile"]}));

router.get("/auth/amazon/callback",
  passport.authenticate("amazon", {failureRedirect: '/login' }), 
    (req, res) => {
      res.redirect("/");
    });


// GOOG routes
router.get("/auth/google", passport.authenticate("google", 
{scope: ["profile, email"]}));

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: '/login'}), 
  (req, res) => {
  res.redirect("/");
});

// TWTR routes
router.get("/auth/twitter", passport.authenticate("twitter", {
  scope: ["profile"]
}));

router.get("/auth/twitter/callback",
  passport.authenticate("twitter", {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect("/");
    });

// FBOOK routes

router.get("/auth/facebook", passport.authenticate("facebook", 
{scope: ['profile']})
);

router.get("/auth/facebook/callback",
  passport.authenticate(("facebook"),{ failureRedirect: '/login' }), 
  (req, res) => {
      res.redirect("/");
    });

router.get("/auth/success", (req, res) => {
  console.log("getitng user data!");
  res.send(user);
});

router.get("/auth/logout", (req, res) => {
  console.log("logging out !");
  req.logout();
  user = {};
  res.redirect("/");
});


// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;