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

const ShelterType = new GraphQLObjectType({
    name: "ShelterType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        users: {
            type: GraphQLString
        },
        paymentEmail: {
            type: GraphQLString
        },
        animals: {
            type: GraphQLString
        }

    })
});

module.exports = ShelterType;