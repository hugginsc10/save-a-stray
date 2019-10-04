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

const CatType = new GraphQLObjectType({
  name: "CatType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLInt},
    age: { type: GraphQLInt},
    breed: { type: GraphQLString },
    sex: { type: GraphQLString },
    color: { type: GraphQLString },
    image: { type: GraphQLString },
    video: { type: GraphQLString },
    description: { type: GraphQLString }

  })
});

module.exports = CatType;