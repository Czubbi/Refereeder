var User = require('./userType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const UserListType = new GraphQLObjectType({
   name:"UserList",
   fields:{
       myUsers:{type:new GraphQLList(User)}
   }
});
module.exports = UserListType;