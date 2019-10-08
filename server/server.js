// const models = require ("./models");
// const express = require("express");
// const app = express();
// const db = require("../config/keys.js").MONGO_URI;
// const expressGraphQL = require("express-graphql");
// const schema = require("./schema/schema");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const Keys = require("../config/keys");
// const User = require("./models/User");
// const passport = require("passport");


// app.use(passport.initialize());
// if (!db) {
//   throw new Error("You must provide a string to connect to MongoDB Atlas");
// }


// const facebookCallback = (accessToken, refreshToken, profile, done) => {
//   const users = User.find({});
//   const matchingUser = users.find(user => user.fbookId === profile.id);

//   if (matchingUser) {
//     done(null, matchingUser);
//     return;
//   }

//   const newUser = {
//     id: uuid(),
//     fbookId: profile.id,
//     firstName: profile.name.givenName,
//     lastName: profile.name.familyName,
//     email: profile.emails && profile.emails[0] && profile.emails[0].value,
//   };
//   users.push(newUser);
//   done(null, newUser);
// };
// // app.set('views', __dirname + '/views');
// // app.set('view engine', 'ejs');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const users = User.find({});
//   const matchingUser = users.find(user => user.id === id);
//   done(null, matchingUser);
// });
// const facebookOptions = {
//   clientID: Keys.fbookClient,
//   clientSecret: Keys.fbookKey,
//   callbackURL: 'http://localhost:5000/auth/facebook/callback',
//   profileFields: ['id', 'email', 'first_name', 'last_name'],
// };
// passport.use(new FacebookStrategy(
//   facebookOptions,
//   facebookCallback,
// ));
// app.get('/auth/facebook', passport.authenticate('facebook', {
//   scope: ['email']
// }));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: 'http://localhost:5000/graphql',
//   failureRedirect: 'http://localhost:5000/graphql',
// }));


// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));
// app.use(cors());

// app.use(
//   "/graphql",
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );

// // remember we use bodyParser to parse requests into json
// app.use(bodyParser.json());

// module.exports = app;


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
      callbackURL: 'http://localhost:5000/auth/facebook/callback',
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