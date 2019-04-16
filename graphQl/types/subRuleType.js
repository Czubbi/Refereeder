var ParagraphContainerType = require('./paragraphContainerType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const SubRuleType = new GraphQLObjectType({
    name: "SubRule",
    fields: {
        number: { type: GraphQLString },
        name:{type:GraphQLString},
        title:{type:GraphQLString},
        paragraphs:{type:new GraphQLList(ParagraphContainerType)},
    }
});
module.exports = SubRuleType;