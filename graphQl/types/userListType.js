var User = require('./userType');
const {
    GraphQLList,
} = require("graphql");

const UserListType = new GraphQLList(User)
module.exports = UserListType;