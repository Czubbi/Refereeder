var testType = require('./testType');
var quizType = require('./quizType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields:{
        "uid":{type:GraphQLString},
        "firstName": {type:GraphQLString},
        "lastName": {type:GraphQLString},
        "email": {type:GraphQLString},
        "username": {type:GraphQLString},
        "dateOfBirth": {type:GraphQLString},
        "phone": {type:GraphQLString},
        "city": {type:GraphQLString},
        "goodAnswers": {type:GraphQLInt},
        "badAnswers": {type:GraphQLInt},
        "testsTaken": {type:new GraphQLList(testType)},
        "quizzesTaken": {type:new GraphQLList(quizType)}
      }
});
module.exports = UserType;