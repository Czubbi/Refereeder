const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFloat,
} = require("graphql");

const testType = new GraphQLObjectType({
    name: "Test",
    fields:{
        "testId": {type:GraphQLString},
        "result": {type:GraphQLFloat}
      }
});
module.exports = testType;