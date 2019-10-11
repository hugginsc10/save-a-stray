const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    userRole: {type: GraphQLString},
    shelter:{
      type: require("./shelter_type"),
      resolve(parentValue) {
        return Shelter.findById(parentValue.shelterId).then(shelter => {
          return shelter
        })
      }
    }
    // fbookId: { type: GraphQLString } do not think that we need  from oauth merge rfq
  })
});

module.exports = UserType;