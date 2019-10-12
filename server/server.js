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

app.use(bodyParser.json());

app.use(passport.initialize());

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));




passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: 'https://localhost:3000/auth/facebook/callback'},
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(null, profile)
    }
    
  ));




app.use(passport.initialize());

app.get('/flogin', passport.authenticate('facebook', {scope: ["email", "name"]}));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false}),
  (req, res) => {
    res.redirect('/');
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

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// remember we use bodyParser to parse requests into json


module.exports = app;