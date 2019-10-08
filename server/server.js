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



app.use(passport.initialize());
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}


passport.use(
  new FacebookStrategy({
      clientID: Keys.fbookClient,
      clientSecret: Keys.fbookKey,
      callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(null, profile);
    },
  ),
);



app.use(passport.initialize());

app.get('/facebooklogin', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }),
  (req, res) => {
    res.send('AUTH WAS GOOD!');
  },
);

// const addUser = async (req, res, next) => {
//   const {
//     name,
//     email,
//     userRole
//   } = data;

//   // create a new user with all our arguments
//   const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       userRole
//     },
//     err => {
//       if (err) throw err;
//     }
//   );

//   // save our user
//   user.save();
//   // we'll create a token for the user
//   const token = jwt.sign({
//     id: user._id
//   }, keys.secretOrKey);

//   // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
//   return {
//     token,
//     loggedIn: true,
//     ...user._doc,
//     password: null
//   };
//   next();
// };

// app.use(addUser);


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