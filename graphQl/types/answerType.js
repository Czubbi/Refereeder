const {
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const AnswerType = new GraphQLObjectType({
    name: "Answer",
    fields: {
        _id:{type: GraphQLID},
        answer: { type: GraphQLString },
        correct:{type:GraphQLBoolean}
    }
});
module.exports = AnswerType;