const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const RuleType = new GraphQLObjectType({
    name: "Rule",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});
module.exports = RuleType;