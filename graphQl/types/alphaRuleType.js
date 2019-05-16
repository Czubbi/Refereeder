var DashRuleType = require('./dashRuleType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const AlphaRuleType = new GraphQLObjectType({
    name: "AlphaRule",
    fields: {
        number:{type:GraphQLString},
        text:{type:GraphQLString},
        dashRules:{type:new GraphQLList(DashRuleType)},
        numRules:{type:new GraphQLList(DashRuleType)}
    }
});
module.exports = AlphaRuleType;