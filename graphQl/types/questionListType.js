var Question = require('./questionType');
const {
    GraphQLList,
} = require("graphql");

const QuestionListType = new GraphQLList(Question)
module.exports = QuestionListType;