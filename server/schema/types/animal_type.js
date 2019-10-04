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
    application: { type: GraphQLString }

  })
});

module.exports = AnimalType;