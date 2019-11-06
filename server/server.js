// const models = require("./models");
// const express = require("express");
// const app = express();
// const db = require("../config/keys.js").MONGO_URI;
// const expressGraphQL = require("express-graphql");
// const schema = require("./schema/schema");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const FacebookStrategy = require("passport-facebook");
// const Keys = require("../config/keys");
// const User = require("./models/User");
// const passport = require("passport");
// const facebookRegister = require("./services/auth")
// const seeds = require("./seeds");




// app.use(passport.initialize());
// if (!db) {
//   throw new Error("You must provide a string to connect to MongoDB Atlas");
// }


// passport.use(
//   new FacebookStrategy({
//       clientID: Keys.fbookClient,
//       clientSecret: Keys.fbookKey,
//       callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback',
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       cb(facebookRegister, profile);
//     },
//   ),
// );



// app.use(passport.initialize());



// app.get('/facebooklogin', passport.authenticate('facebook'));
// // app.get('/facebooklogin', seeds);

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     session: false
//   }),
//   (req, res) => {
//     res.send(Keys.fbookClient);
//   },
// );

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
<<<<<<< HEAD
const facebookRegister = require("./services/auth");
const googleRegister = require("./services/auth");
const GoogleStrategy = require("passport-google").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const chalk = require("chalk");
const app = express();
const GoogleLogin = require("../client/src/components/GoogleLogin");




// passport.serializeUser((user, cb ) => {cb(null, user);});

// passport.deserializeUser((obj, cb) => {cb(null, obj);});


app.use(passport.initialize());

=======
const { facebookRegister } = require("./services/auth")
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372

// Social Auth

passport.use(
  new FacebookStrategy({
<<<<<<< HEAD
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
passport.use(
  new GoogleStrategy({
      clientID: Keys.googClient,
      clientSecret: Keys.googKey,
      callbackURL: 'https://save-a-stray.herokuapp.com/auth/google/callback',
=======
    clientID: Keys.fbookClient,
    clientSecret: Keys.fbookKey,
    callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback',
    // callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
    async (accessToken, refreshToken, profile, cb) => {
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      // return cb(err, user);
      let userData = await facebookRegister(profile)

      console.log("inside of FacebookStrategy ")
      console.log(userData)
      console.log("inside of FacebookStrategy ")
      let userStuff = { userId: userData.id, token: userData.token }
      cb(null, userStuff);
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(googleRegister, profile);
      }
  ),
);

<<<<<<< HEAD
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



// router.get("/auth/amazon", passport.authenticate("amazon", 
// {scope: ["profile"]}));

// router.get("/auth/amazon/callback",
//   passport.authenticate("amazon", {failureRedirect: '/login' }), 
//     (req, res) => {
//       res.redirect("/");
//     });


// GOOG routes
router.get("/auth/google", passport.authenticate("google", 
{scope: ["profile"]}));

router.get("/auth/google/callback",
  passport.authenticate("google", { 
=======
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


const app = express();


// rfq

// app.use(function (req, res, next) {
//   /*var err = new Error('Not Found');
//    err.status = 404;
//    next(err);*/

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//   //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   // Pass to next layer of middleware
//   next();
// });


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
>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372
    session: false
  }), 
  (req, res) => {
<<<<<<< HEAD
    res.send(Keys.googClient)
  }

);

// TWTR routes
// router.get("/auth/twitter", passport.authenticate("twitter", {
//   scope: ["profile"]
// }));

// router.get("/auth/twitter/callback",
//   passport.authenticate("twitter", {failureRedirect: '/login'}),
//     (req, res) => {
//       res.redirect("/");
//     });

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
=======
    // let user = User.findById(req.userId)
    // res.send('AUTH WAS GOOD!');
    // res.setHeader({"auth-token": req.userStuff.token})
    // res.redirect('/#/Landing')
    res.json({ my_token: req.userStuff.token })
  },
);

>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
<<<<<<< HEAD

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
=======



>>>>>>> d2368c76eb1f9ef1aad04ceef80490ce8596c372

module.exports = app;