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
const facebookRegister = require("./services/auth")


app.use(bodyParser.json());

app.use(passport.initialize());
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}


passport.use(
  new FacebookStrategy({
    clientID: Keys.fbookClient,
    clientSecret: Keys.fbookKey,
    callbackURL: 'https://localhost:3000/auth/facebook/callback',
    scope: ['email'],
    profileFields: ['id', 'emails']
  },
    (accessToken, refreshToken, profile, cb) => {
      cb(facebookRegister, profile);
    },
  ),
);



app.use(passport.initialize());

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }),
  (req, res) => {
    res.send(Keys.fbookClient);
  },
);

app.get('/auth/google', passport.authenticate('google', { scope: ["profile"] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error'
  }),

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