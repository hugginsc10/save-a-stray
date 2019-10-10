const models = require("./models");
const express = require("express");
const app = express();
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



app.use(passport.initialize());
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});





passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: '/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      // console.log(Keys.fbookClient);
      cb(facebookRegister, profile);
    },
  ),
);



app.use(passport.initialize());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/error'
  }),
  (req, res) => {
    res.redirect('/success');
  },
);
app.get('/auth/google', passport.authenticate('google', {scope: ["profile"]}));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error'}),
  
  (req, res) => {
    res.redirect('/success');
  },
);
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
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;