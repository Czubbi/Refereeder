var graphqlHTTP = require('express-graphql');
var RuleType = require('../types/ruleType.js')
var RuleListType = require('../types/ruleListType.js')
var RuleCtr = require('../../database/rulesController');
var ruleCtr = new RuleCtr();
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
                                return this.getRuleById(args.id).then(x=>{
                                    return x;
                                });
                            }
                            else return null;
                        }
                    },
                    all:{
                        type: RuleListType,
                        args:{},
                        resolve:(root,args,context,info)=>{
                            return this.getAllRules().then(x=>{
                                return x;
                            });
                        }
                    },
                }
            })
        });
    }
    getAllRules()
    {
        return new Promise((resolve,reject)=>{
            ruleCtr.getRules((err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var rules = JSON.parse(data);
                    resolve(rules);
                }
            })
        })
    }
    getRuleById(id)
    {
        return new Promise((resolve,reject)=>{
            ruleCtr.getRuleByID(id,(err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var rule = JSON.parse(data);
                    resolve(rule);
                }
            })
        })
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