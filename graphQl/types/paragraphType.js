var AlphaRuleType = require('./alphaRuleType');
var DashRuleType = require('./dashRuleType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const ParagraphType = new GraphQLObjectType({
    name: "Paragraph",
    fields: {
        number:{type:GraphQLString},
        title:{type:GraphQLString},
        text:{type:GraphQLString},
        alphaRules:{type:new GraphQLList(AlphaRuleType)},
        dashRules:{type:new GraphQLList(DashRuleType)},
    }
});
module.exports = ParagraphType;