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
const Shelter = mongoose.model("shelter")
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
        paymentEmail: {
            type: GraphQLString
        },
        animals: {
            type: require("./animal_type"),
            resolve(parentValue) {
                return Shelter.findById(parentValue._Id).populate("animals").then(shelter => {
                    return shelter.animals
                })
            }
        },
        users: {
            type: require("./user_type"),
            resolve(parentValue) {
                return Shelter.findById(parentValue._Id).populate("users").then(shelter => {
                    return shelter.users
                })
            }
        }

    })
});

module.exports = ShelterType;