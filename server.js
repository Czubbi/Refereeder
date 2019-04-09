const express = require('express');
const app = express();
var firebase = require('firebase');
var fireBaseConfig=require('./firebase.json');
var GraphqlController = require('./graphQl/graphQl');
var graphQlCtr = new GraphqlController(app);
var port = process.env.PORT || 4000;
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
function initGraph(app)
{
    graphQlCtr.initGraphQl(app).then(()=>{
        console.log('GraphQL initialized...');
    })
}

//Endpoints setup


//Final setup
//Get user by ID
app.get('/api/User/:id',(req,res)=>{
    graphQlCtr.fetchGraph(port, { query: `{ user(id:${req.params.id}){firstname,lastname} }` }).then(x=>{
        res.json(x);
    }).catch(err=>{
        console.log(err);
    })
})

//Get all users
app.get('/api/Users', (req,res)=>{
    graphQlCtr.fetchGraph(port,{ query: `{users{firstname, lastname}}`}).then(x=>{
        res.json(x);
    }).catch(err=>{
        console.log(err);
    })
})
//Starting server


app.listen(port, ()=>{
    initFireBase(fireBaseConfig);
    initGraph(app);
    console.log(`Server started on port ${port}`);
})