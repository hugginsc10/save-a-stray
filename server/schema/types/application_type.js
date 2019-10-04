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

const ApplicationType = new GraphQLObjectType({
  name: "ApplicationType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    animalId: { type: GraphQLString},
    userId: { type: GraphQLString},
    applicationData: { type: GraphQLString }

  })
});

module.exports = ApplicationType;