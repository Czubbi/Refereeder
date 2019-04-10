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
            _id:2
        },
        {
            firstname:'Piotr',
            lastname:'Gzubicki',
            _id:3
        },
        {
            firstname:'David',
            lastname:'Szoke',
            _id:1,
        }];
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: "UserQuery",
                fields: {
                    one: {
                        type: UserType,
                        args: {
                            id: { type: GraphQLString},
                            email:{type:GraphQLString},
                            username:{type: GraphQLString},
                            uid:{type:GraphQLString}
                        },
                        resolve: (root, args, context, info) => {
                            if(args.id){
                                return this.getUserByID(args.id).then(x=>{
                                    return x;
                                });
                            }
                            else if(args.email){
                                return this.getUserByQuery({"email":args.email}).then(x=>{
                                    return x;
                                });
                            }
                            else if(args.username){
                                return this.getUserByQuery({"username":{'$regex': args.username}}).then(x=>{
                                    return x;
                                });
                            }
                            else if(args.uid){
                                return this.getUserByQuery({"uid":{'$regex': uid}}).then(x=>{
                                    return x;
                                });
                            }
                        }
                    },
                    all:{
                        type: UserListType,
                        args:{},
                        resolve:(root,args,context,info)=>{
                            return this.getAllUsers().then(x=>{
                                return x;
                            });
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
    getUserByID(id)
    {
        return new Promise((resolve,reject)=>{
            userCtr.getUserByID(id,(err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var user =JSON.parse(data);
                    resolve(user);
                }
            });
        })
    }
    getUserByQuery(query)
    {
        console.log(query);
        return new Promise((resolve,reject)=>{
            userCtr.getUserByQuery(query,(err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var user =JSON.parse(data);
                    resolve(user);
                }
            });
        })
    }
    getAllUsers()
    {
        return new Promise((resolve,reject)=>{
            userCtr.getUsers((err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var users = JSON.parse(data);
                    resolve(users);
                }
            })
        })
    }
}
module.exports = GraphqlUserController;