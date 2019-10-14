const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");

// here is our validator function
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    // deconstruct our data
    const {
      name,
      email,
      password,
      userRole,
      shelterId
    } = data;

    // we want to wait until our model can tell us whether a user exists with that email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("This email is already used");
    }

    const existingName = await User.findOne({ name });

    if (existingName) {
      throw new Error("This name is taken");
    }

    // hash our password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with all our arguments
    const user = new User(
      {
        name,
        email,
        password: hashedPassword,
        userRole, 
        shelterId
      },
      err => {
        if (err) throw err;
      }
    );

    // save our user
    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const facebookRegister = async (data) => {
  // console.log(99999999999999999999)
  console.log(data)
  // console.log(99999999999999999999)
  try {
    
    console.log("console.log 1")
    const { id, displayName } = data
    const email = id
    const name = displayName
    const userRole = "endUser"
    // we want to wait until our model can tell us whether a user exists with that email
    const existingEmail =  User.findOne({ email: id }).then(email1 => {
      console.log("in existingEmail")
      console.log(email1)
      console.log("in existingEmail")
    });
    
    console.log("console.log 2")
    
    if (existingEmail) {
      console.log("console.log 3")
      
      // Log the user in 
      try {
        console.log("console.log 4")
        // use our other validator we wrote to validate this data
        
        // const user = await User.findOne({
          //   email
          // })
          // if (!user) {
            //   throw new Error("This user does not exist");
            // }
            
            // const correctPassword = await bcrypt.compareSync(email, user.password);
            // if (!correctPassword) {
              //   throw new Error("Invalid credentials");
              // }
              
        const token = jwt.sign({
          id: user._id
        }, keys.secretOrKey);
        console.log("console.log 5")

        return {
          token,
          id,
          loggedIn: true,
          ...user._doc,
          password: null
        };
      } catch (err) {
        console.log("console.log 6")

        throw err;
      }

    }

    // hash our password
    const hashedPassword = await bcrypt.hash(email, 10);

    // create a new user with all our arguments
    const user = new User(
      {
        name,
        email,
        password: hashedPassword,
        userRole
      },
      err => {
        if (err) throw err;
      }
    );
    console.log("console.log 7")


    // save our user
    user.save();
    console.log("console.log 8")
    console.log(user)
    console.log("console.log 8")

    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null,id: user._id  };

  } catch (err) {
    console.log("console.log 3")
    throw err;
  }
};

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const { email, password } = data
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("This user does not exist");
    }

    const correctPassword = await bcrypt.compareSync(password, user.password);
    if (!correctPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { _id } = data;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("This user does not exist");
    }

    const token = "";
    return { token, loggedIn: false, ...user._doc, password: null }
  } catch (err) {
    throw err;
  }
}

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;


    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      if (user){      
      user.varId =  id
      user.save()
    }
      return user ? true:false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyUser,
  facebookRegister
};