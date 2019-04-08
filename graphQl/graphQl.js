var graphqlHTTP = require('express-graphql');
var UserType = require('./types/userType.js')
var UserListType = require('./types/userListType.js')
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
class GraphqlController
{
    constructor(){
        this.initGraphStuff();
    }    
    initGraphStuff()
    {
        models.Users=[{
            firstname:'Miquel',
            lastname:'Cami',
            id:2
        },
        {
            firstname:'Piotr',
            lastname:'Gzubicki',
            id:3
        },
        {
            firstname:'David',
            lastname:'Szoke',
            id:1,
        }];
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: "Query",
                fields: {
                    user: {
                        type: UserType,
                        args: {
                            id: { type: GraphQLNonNull(GraphQLID) }
                        },
                        resolve: (root, args, context, info) => {
                            if(args.id)
                            {
                                return models.Users.filter(x=>x.id==args.id)[0];  
                            }
                            else return null;
                        }
                    },
                    users:{
                        type: UserListType,
                        args:{},
                        resolve:(root,args,context,info)=>{
                            return models.Users;
                        }
                    },
                }
            })
        });
    }
    fetchGraph(port,query)
    {
        return new Promise((resolve,reject)=>{
            fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query),
            }).then(x=>x.json()).then(result=>{
                resolve(result);
            }).catch(err=>{
                reject(err);
            })
        })
    }
    initGraphQl(app)
    {
        return new Promise((resolve,reject)=>{
            app.use("/graphql", graphqlHTTP({
                schema: schema,
                graphiql: true
            }));
            resolve()
        })
    }
}
module.exports = GraphqlController;