const models = require("./models");
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
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
const {createTokens, refreshToken } = require("./services/auth");

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
      profileFields: ['id', 'emails'],
  },
    async (accessToken, refreshToken, profile, cb) => {
     const {id, emails: [{ value }] } =  profile;
     let fbUser = await models.User.findOne({
       where: { $or:  [{ fbId: id  },  {  email: value }] },
     });
     console.log(fbUser);
     console.log(profile);

     if (!fbUser) {
       fbUser = await models.User.create({
         fbId: id,
         email: value,
       })
     } else if (!fbUser.fbId) {
       await  fbUser.update({
         fbId: id,
       })
     }
     cb(null,  fbUser);
    }
    
  ));




app.use(passport.initialize());




app.get('/flogin', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false}),
  async (req, res) => {
    const [token, refreshToken] = await createTokens(req.user, Keys.secretOrKey);
    res.redirect(`https://localhost:3000/home?token=${token}&refreshToken=${refreshToken}`);
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

app.use(cors('*'));

app.use(
'/grapiql',
expressGraphQL({
  endpointUrl: '/graphql'
})
)
app.use(
  "/graphql",
  bodyParser.json(),
  expressGraphQL(req => ({
    schema,
    context: {
      models,
      user:  req.user,
    },
    graphiql: true
  })
));

// remember we use bodyParser to parse requests into json


module.exports = app;