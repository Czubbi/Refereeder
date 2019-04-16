var SubRuleType=require('./subRuleType');
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
        _id: { type: GraphQLID },
        number: { type: GraphQLString },
        lang: { type: new GraphQLObjectType({
            name:"Lang",
            fields:
            {
                eng:{type:new GraphQLObjectType({
                    name:"Eng",
                    fields:
                    {
                        name:{type:GraphQLString},
                        title:{type:GraphQLString},
                        text:{type:GraphQLString},
                        subRules:{type:new GraphQLList(SubRuleType)}
                    }
                })},
                esp:{type:new GraphQLObjectType({
                    name:"Esp",
                    fields:
                    {
                        name:{type:GraphQLString},
                        title:{type:GraphQLString},
                        text:{type:GraphQLString},
                        subRules:{type:new GraphQLList(SubRuleType)}
                    }
                })},
            }
        }) }
    }
});
module.exports = RuleType;