var graphqlHTTP = require('express-graphql');
var RuleType = require('../types/ruleType.js')
var RuleListType = require('../types/ruleListType.js')
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
} = require("graphql");
var models={};
var schema={};
class GraphqlRuleController
{
    constructor(){
        this.initGraphStuff();
    }    
    initGraphStuff()
    {
        models.Rules=[{
            title:'Rule one',
            description:'This is the first rule',
            id:1
        },
        {
            title:'Rule two',
            description:'This is the second rule',
            id:2
        },
        {
            title:'Rule three',
            description:'This is the third rule',
            id:3
        }];
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: "RuleQuery",
                fields: {
                    one: {
                        type: RuleType,
                        args: {
                            id: { type: GraphQLNonNull(GraphQLID) }
                        },
                        resolve: (root, args, context, info) => {
                            if(args.id)
                            {
                                return models.Rules.filter(x=>x.id==args.id)[0];  
                            }
                            else return null;
                        }
                    },
                    all:{
                        type: RuleListType,
                        args:{},
                        resolve:(root,args,context,info)=>{
                            return models.Rules;
                        }
                    },
                }
            })
        });
    }

    initGraphQl(app)
    {
        return new Promise((resolve,reject)=>{
            app.use("/graphql/rules", graphqlHTTP({
                schema: schema,
                graphiql: true
            }));
            resolve()
        })
    }
}
module.exports = GraphqlRuleController;