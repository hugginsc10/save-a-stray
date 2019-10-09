const models = require("./models");
const express = require("express");
// const app = express();
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const FacebookStrategy = require("passport-facebook");
const Keys = require("../config/keys");
const User = require("./models/User");
const passport = require("passport");
const facebookRegister = require("./services/auth");
const GoogleStrategy = require("passport-google");
const AmazonStrategy = require("passport-amazon");

const chalk = require("chalk");

app.use(passport.initialize());
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

passport.serializeUser((user, cb ) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const app = express();

app.use(cors());
// app.use(passport.initialize());

// FACEBOOK OAUTH

passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: '/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User = { ...profile };
      return cb(null, profile);
      // User.findOrCreate({facebookId: profile.id }, (err, user) => {
        // return cb(err, user);
      // })
    },
  ),
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
  passport.authenticate(("facebook"),
    (req, res) => {
      res.redirect("/profile");
    }));

// GOOGLE OAUTH

passport.use(
  new GoogleStrategy({
      clientID: Keys.GOOGLE.clientId,
      clientSecret: Keys.GOOGLE.clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User = {...profile};
      return cb(null, profile);
    },
  ),
);
app.get("/auth/google", passport.authenticate("google", 
{scope: ["profile", "email"]}));

app.get("/auth/google/callback",
  passport.authenticate(("google"),
    (req, res) => {
      res.redirect("/profile");
    }));


// AMAZON OAUTH
passport.use(
  new AmazonStrategy({
      clientID: Keys.AMAZON.clientId,
      clientSecret: Keys.AMAZON.clientSecret,
      callbackURL: '/auth/amazon/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User = {...profile};
      return cb(null, profile);
    },
  ),
);
app.get("/auth/amazon", passport.authenticate("amazon", 
{scope: ["profile"]}));

app.get("/auth/amazon/callback",
  passport.authenticate(("amazon"),
    (req, res) => {
      res.redirect("/profile");
    }));

// TWITTER OAUTH
passport.use(
  new TwitterStrategy({
      clientID: Keys.TWITTER.clientId,
      clientSecret: Keys.TWITTER.clientSecret,
      callbackURL: '/auth/twitter/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User = {
        ...profile
      };
      return cb(null, profile);
    },
  ),
);
app.get("/auth/twitter", passport.authenticate("twitter", {
  scope: ["profile"]
}));

app.get("/auth/twitter/callback",
  passport.authenticate(("twitter"),
    (req, res) => {
      res.redirect("/profile");
    }));





app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;