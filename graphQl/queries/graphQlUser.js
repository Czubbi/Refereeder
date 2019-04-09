var graphqlHTTP = require('express-graphql');
var UserType = require('../types/userType.js')
var UserListType = require('../types/userListType.js')
var userController = require('../../database/usersController.js')
var userCtr = new userController();
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
class GraphqlUserController
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
                name: "UserQuery",
                fields: {
                    one: {
                        type: UserType,
                        args: {
                            id: { type: GraphQLNonNull(GraphQLID) }
                        },
                        resolve: (root, args, context, info) => {
                            if(args.id)
                            {
                                userCtr.getUserByID(args.id,(err,data)=>{
                                    if(err){
                                        console.log('Error: ' + err);
                                        return null;
                                    }
                                    else{
                                        console.log('Data: ' + data);
                                        return data;
                                    }
                                })
                            }
                            else return null;
                        }
                    },
                    all:{
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
    initGraphQl(app)
    {
        return new Promise((resolve,reject)=>{
            app.use("/graphql/users", graphqlHTTP({
                schema: schema,
                graphiql: true
            }));
            resolve()
        })
    }
}
module.exports = GraphqlUserController;