const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt, 
  GraphQLID,
  GraphQLNonNull 
} = graphql;
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const User = mongoose.model("user");
const Animal = mongoose.model("animal");
const Application = mongoose.model("application");
const Shelter = mongoose.model("shelter");
const AuthService = require("../services/auth")
const AnimalType = require("./types/animal_type")
const ShelterType = require("./types/shelter_type")
const ApplicationType = require("./types/application_type")
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userRole:{type: GraphQLString}
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
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
      async resolve(_, {token}, ctx ) {
        return await AuthService.verifyUser({ token: ctx.token || token});
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
        applications: {type: GraphQLID}
        
      },
      resolve(parentValue, { name,type, age, sex, color, description, image, video}){
        const newAn = new Animal({ name,type, age, sex, color, description, image, video})
        newAn.save()
        return newAn
      }
    }, 
    newApplication: {
      type: ApplicationType,
      args:{
        animalId: {type: GraphQLString},
        userId: {type: GraphQLString},
        applicationData: {type: GraphQLString}
        
      },
      resolve(parentValue, {
          animalId,
          userId,
          applicationData
        }) {
        const newApp = new Application({
          animalId,
          userId,
          applicationData
        })
        return Animal.findById(animalId).then(animal => {
          animal.applications.push(newApp._id)
          animal.save()
          newApp.save()
          return newApp
        })
      }
    },
    newShelter: {
      type: ShelterType,
      args:{
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        // users: {type: GraphQLString},
        paymentEmail: {type: GraphQLString}
        // animals: {type: GraphQLString}
        
      },
      resolve(parentValue, {
          name,
          location,
          users,
          paymentEmail,
          animals
        }) {
         
        const newShelter = new Shelter({
          name,
          location,
          users,
          paymentEmail,
          animals
        })
        newShelter.save()
        return newShelter
      }
    }
  }
});

module.exports = mutation;