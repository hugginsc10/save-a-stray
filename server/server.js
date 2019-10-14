// const models = require("./models");
// const cookieParser = require("cookie-parser")
// const session = require('express-session');
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
// const user = require("./models/User");
// const passport = require("passport");
// const facebookRegister = require("./services/auth")



// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));

  
//   app.use(bodyParser.json());

//   app.use(passport.initialize());
  
//   app.use(passport.session());
  
//   passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });

//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });


//   if (!db) {
//     throw new Error("You must provide a string to connect to MongoDB Atlas");
//   }
  
  
//   passport.use(
//     new FacebookStrategy({
//       clientID: Keys.fbookClient,
//       clientSecret: Keys.fbookKey,
//       callbackURL: 'https://localhost:3000/auth/facebook/callback',
//       scope: ['email'],
//       profileFields: ['id', 'emails']
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log(1111111111111111111111)
//       console.log(profile)
//       console.log(2222222222222222222222)
      
//       console.log(refreshToken)
//       console.log(3333333333333333333333)
//       console.log(accessToken)
//       cb(facebookRegister, profile);
//     },
//     ),
//     );
    
    


// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// // app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// // app.use("/api/fb", app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] })));
// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     session: false
//   }),
//   (req, res) => {
//     res.send(Keys.fbookClient);
//   },
// );

// app.get('/auth/google', passport.authenticate('google', { scope: ["profile"] }));

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/error'
//   }),

//   (req, res) => {
//     res.redirect('/success');
//   },
// );


// app.use(cors());

// app.use(
//   "/graphql",
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );

// // remember we use bodyParser to parse requests into json


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
const {facebookRegister} = require("./services/auth")

passport.use(
  new FacebookStrategy({
    clientID: Keys.fbookClient,
    clientSecret: Keys.fbookKey,
    callbackURL: 'https://save-a-stray.herokuapp.com/auth/facebook/callback',
    // callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
    (accessToken, refreshToken, profile, cb) => {
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        // return cb(err, user);
      let userData = facebookRegister(profile)
      let userStuff = {userId: userData.user._id, token: userData.token}
      cb(null, userStuff);
    },
  ),
);

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


app.get('/a',() => console.log(11111111111111));
app.get('/facebooklogin', cors(), passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }),
  (req, res) => {
    // let user = User.findById(req.userId)
    // res.send('AUTH WAS GOOD!');
    // res.setHeader({"auth-token": req.userStuff.token})
    // res.redirect('/#/Landing')
    res.json({ my_token: req.userStuff.token  })
  },
);


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));




module.exports = app;