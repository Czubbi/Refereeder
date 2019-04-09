const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        _id:{type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString }
    }
});
module.exports = UserType;