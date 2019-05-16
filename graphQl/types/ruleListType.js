var Rule = require('./ruleType');
const {
    GraphQLList,
} = require("graphql");

const RuleListType = new GraphQLList(Rule)
module.exports = RuleListType;