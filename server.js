const express = require('express');
const app = express();
var firebase = require('firebase');
var fireBaseConfig=require('./firebase.json');
var graphqlHTTP = require('express-graphql');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
var userController = require('./User/userController.js')
var userCtr = new userController();

//Functions used in the server
function initFireBase(config){
    if(!firebase.apps.length)
    {
        firebase.initializeApp(config);
        console.log('Firebase initialized...');
    }
}
//Endpoints setup


//Final setup
var port = process.env.PORT || 4000;
var PersonModel={
    firstname:'David',
    lastname:'Szoke',
    id:1,
}
const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            people: {
                type: GraphQLList(PersonType),
                resolve: (root, args, context, info) => {
                    return PersonModel.find().exec();
                }
            },
            person: {
                type: PersonType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    if(PersonModel.id==args.id){
                        return PersonModel;
                    }
                }
            }
        }
    })
});

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.get('/api/Person/:id',(req,res)=>{
    fetch(`http://localhost:${port}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ person(id:${req.params.id}){firstname,lastname} }` }),
    }).then(x=>x.json()).then(result=>{
        res.json(result);
    })
})
//Starting server


app.listen(port, ()=>{
    initFireBase(fireBaseConfig);
    console.log(`Server started on port ${port}`);
})