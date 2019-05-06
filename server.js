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
var ruleController = require('./database/rulesController');
var ruleCtr = new ruleController();
var userCtr = new userController();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
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
//RESTful api for USERS
app.delete('/api/users/:id',(req,res)=>{
    userCtr.deleteUser(req.params.id,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');
    })
})
//RESTful api for RULES
app.delete('/api/rules/:id',(req,res)=>{
    ruleCtr.deleteRule(req.params.id,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');    
    })
})
app.post('/api/rules',(req,res)=>{
    var data=req.body;
    console.log(data);
    var rule={
        number:req.body.number,
        lang:{
            eng:{
                name:req.body.name,
                title:req.body.title,
                text:req.body.text,
                subRules:[]
            }
        }
    };
    ruleCtr.insertRule(rule,(err,result)=>{
        if(err) 
        {
            console.log(err);
            res.status(500);
        }
        else res.status(200);
        res.send('SUCCESS');
    });
})
app.post('/api/rules/:id/subrules',(req,res)=>{
    var data=req.body;
    console.log(data);
    var rule={
        number:req.body.number,
        name:req.body.name,
        title:req.body.title,
        text:req.body.text,
        dashRules:[],
        numRules:[]
    };
    console.log(rule);
    ruleCtr.insertSubRule(req.params.id,rule,(err,result)=>{
        if(err) 
        {
            console.log(err);
            res.status(500);
        }
        else res.status(200);
        res.send('SUCCESS');
    });
})
app.delete('/api/rules/:id/subrules/:subid',(req,res)=>{
    ruleCtr.deleteSubRule(req.params.id,req.params.subid,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');
    })
})
//Starting server


app.listen(port, ()=>{
    initFireBase(fireBaseConfig);
    initGraph(app);
    console.log(`Server started on port ${port}`);
})