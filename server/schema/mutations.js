const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
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
        userRole:{type: GraphQLString},
        shelterId: {type: GraphQLString}
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
        applications: {type: GraphQLID}
        
      },
      resolve(parentValue, { name,type, age, sex, color, description, image, video}){
        const newAn = new Animal({ name,type, age, sex, color, description, image, video})
        newAn.save()
        return newAn
      }
    }, 
    deleteAnimal: {
      type: AnimalType,
      args: {
        _id: {type: GraphQLID}
      },
      resolve(_, {_id}){
        return Animal.deleteOne(_id)
      }
    },
    updateAnimal: {
      type: AnimalType,
      args: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        age: {type: GraphQLInt},
        sex: {type: GraphQLString},
        color: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        video: {type: GraphQLString},
        applications: {type: GraphQLID}},
      resolve(_, {
        _id,
        name,
        type,
        age,
        sex,
        color,
        description,
        image,
        video
      }){
        return Animal.findById(_id).then(animal => {
          animal.name = name 
          animal.type = type 
          animal.age = age 
          animal.sex = sex 
          animal.color = color 
          animal.description = description 
          animal.image = image 
          animal.video = video 
          animal.save()
          return animal
        })
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
    deleteApplication: {
      type: ApplicationType,
      args: {_id: {type: GraphQLID}},
      resolve(_, {_id }){
        return Application.deleteOne(_id)
      }
    },
    editApplication: {
      type: ApplicationType,
      args: {
        _id: {type: GraphQLID},
        animalId: {type: GraphQLString},
        applicationData: {type: GraphQLString}
      },
      resolve(_,{_id,animalid,applicationData}){
        return Application.findById(_id).then(application => {
          application.applicationData = applicationData
          application.save()
          return application
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
    },
    deleteShelter:{
      type: ShelterType,
      args: {_id: {type: GraphQLID}},
      resolve(_, {_id}){
        return Shelter.deleteOne(_id)
      } 
    },
    editShelter:{
      type: ShelterType,
      args: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        users: {type: GraphQLString},
        paymentEmail: {type: GraphQLString},
        animals: {type: GraphQLString}
      },
      resolve(_,{_id, name, location, users, paymentEmail, animals }){
        return Shelter.findById(_id).then(shelter => {
          shelter.name = name, 
          shelter.location = location, 
          shelter.users = users, 
          shelter.paymentEmail = paymentEmail, 
          shelter.animals = animals
          shelter.save() 
          return shelter 
        })
      }
    }
  }
});

module.exports = mutation;