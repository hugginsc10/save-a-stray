const mongoose = require("mongoose");
const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
} = graphql;

const Animal = mongoose.model("animal")
const Application = mongoose.model("application")
const AnimalType = new GraphQLObjectType({
  name: "AnimalType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString},
    type: { type: GraphQLString},
    age: { type: GraphQLInt},
    breed: { type: GraphQLString },
    sex: { type: GraphQLString },
    color: { type: GraphQLString },
    image: { type: GraphQLString },
    video: { type: GraphQLString },
    description: { type: GraphQLString },
    applications: {
        type: new GraphQLList(require("./application_type")),
        resolve(parentValue) {
          return Animal.findById(parentValue._id)
            .populate("applications")
            .then(animal => {             
              return animal.applications
            });
        }
    }

  })
});

module.exports = AnimalType;