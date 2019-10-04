const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("user");

const DogType = require("./dog_type");
const Dog = mongoose.model("dog");

const CatType = require("./cat_type");
const Cat = mongoose.model("cat");



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
    dogs: {
      type: new GraphQLList(CatType),
      resolve() {return Dog.find({});
      }
    },
    dog: {
      type: DogType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Dog.findById(args._id);
      }
    },
    cats: {
      type: new GraphQLList(CatType),
      resolve() {
        return Cat.find({});
      }
    },
    cat: {
      type: CatType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Cat.findById(args._id);
      }
    }
   
  })
});

module.exports = RootQueryType;