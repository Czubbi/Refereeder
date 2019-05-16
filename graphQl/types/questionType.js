var AnswerType=require('./answerType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: {
        _id: { type: GraphQLID },
        ruleNumber: { type: GraphQLString },
        questionNumber: { type: GraphQLString },
        question: { type: GraphQLString },
        answers:{type:new GraphQLList(AnswerType)},
        rulesReference:{type:new GraphQLList(GraphQLString)}
    }
});
module.exports = QuestionType;