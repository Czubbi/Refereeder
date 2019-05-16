const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLBoolean,
} = require("graphql");

const quizType = new GraphQLObjectType({
    name: "Quiz",
    fields:  {
        "oppUsername": {type:GraphQLString},
        "win": {type:GraphQLBoolean}
      }
});
module.exports = quizType;