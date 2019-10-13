const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const AnimalType = require("./animal_type");
const ApplicationType = require("./application_type")
const ShelterType = require("./shelter_type")

const Application = mongoose.model("application");
const Animal = mongoose.model("animal");
const User = mongoose.model("user");
const Shelter = mongoose.model("shelter");



const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    animals: {
      type: new GraphQLList(AnimalType),
      resolve() {
        return Animal.find({});
      }
    },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve() {
        return Application.find({});
      }
    },
    animal: {
      type: AnimalType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Animal.findById(args._id);
      }
    },
    shelters: {
      type: new GraphQLList(ShelterType),
      resolve(){
        return Shelter.find({})
      }
    },
    shelter: {
      type: ShelterType,
      args: {_id: {type: GraphQLID}},
      resolve(_,{_id}){
        return Shelter.findById(_id)
      }
    } 
   
  })
});

module.exports = RootQueryType;