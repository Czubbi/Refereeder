const express = require('express');
const app = express();
var firebase = require('firebase');
var fireBaseConfig=require('./firebase.json');
var GraphqlRuleController = require('./graphQl/queries/graphQlRules.js');
var GraphqlUserController = require('./graphQl/queries/graphQlUser.js');
var graphQlUserCtr = new GraphqlUserController(app);
var graphQlRuleCtr = new GraphqlRuleController(app)
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
    graphQlUserCtr.initGraphQl(app).then(()=>{
        console.log('GraphQL Users initialized...');
    });
    graphQlRuleCtr.initGraphQl(app).then(()=>{
        console.log('GraphQL Rules initialized...');
    });
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