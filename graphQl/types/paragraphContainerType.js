var ParagraphType=require('./paragraphType');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

const ParagraphContainerType = new GraphQLObjectType({
    name: "ParagraphContainer",
    fields: {
        paragraphs:{type:new GraphQLList(ParagraphType)}
    }
});
module.exports = ParagraphContainerType;