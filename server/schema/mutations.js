const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const User = mongoose.model("user");
const Animal = mongoose.model("animal");


const AuthService = require("../services/auth")
const AnimalType = require("./types/animal_type")
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newAnimal: {
      type: AnimalType,
      args:{
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        age: {type: GraphQLInt},
        sex: {type: GraphQLString},
        color: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        video: {type: GraphQLString},
        application: {type: GraphQLString}
        
      },
      resolve(parentValue, { name,type, age, sex, color, description, image, video, Application}){
        return new Animal({ name, age, sex, color, description, image, video})
      }
    }, 
  }
});

module.exports = mutation;