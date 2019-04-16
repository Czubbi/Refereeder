const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const DashRuleType = new GraphQLObjectType({
    name: "DashRule",
    fields: {
        number:{type:GraphQLString},
        text:{type:GraphQLString},
    }
});
module.exports = DashRuleType;