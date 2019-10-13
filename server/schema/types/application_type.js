const mongoose = require("mongoose");
const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;
const Animal = mongoose.model("animal") 
const ApplicationType = new GraphQLObjectType({
  name: "ApplicationType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    animalId: { type: GraphQLString},
    userId: { type: GraphQLString},
    applicationData: { type: GraphQLString },
    animal:{
      type: require("./animal_type"),
        resolve(parentValue) {
          return Animal.findById(parentValue.animalId).then(animal => {
            return animal
          })
        }
    }

  })
});

module.exports = ApplicationType;