const express = require('express');
const app = express();
var firebase = require('firebase');
var fireBaseConfig=require('./firebase.json');
var GraphqlRuleController = require('./graphQl/queries/graphQlRules.js');
var GraphqlUserController = require('./graphQl/queries/graphQlUser.js');
var GraphqlQuestionController = require('./graphQl/queries/graphQlQuestions.js');
var graphQlUserCtr = new GraphqlUserController(app);
var graphQlRuleCtr = new GraphqlRuleController(app);
var graphQlQuestionCtr = new GraphqlQuestionController(app);
var port = process.env.PORT || 4000;
var userController = require('./database/usersController.js');
var ruleController = require('./database/rulesController');
var questionController = require('./database/questionsController');
var ruleCtr = new ruleController();
var userCtr = new userController();
var questionCtr = new questionController();
var rethinkdb = require('rethinkdb');
var rethinkConf=require('./rethinkconfig.json');
var rethinkConn;
var http=require('http');
var server=http.createServer()
server.listen(5000);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var clients={};
app.use(bodyParser.urlencoded({ extended: true }));
//FUNCTIONS
checkIfValidQuizQuestion=(question)=>{
    var answers=question.answers;
    var falseCounter=0;
    answers.forEach(element => {
        if(element.correct==false){
            falseCounter++;
        }
    });
    return falseCounter>=3;
}
shuffleArray=(myArray)=>{
    var array=[...myArray];
    array=array.filter(question=>question.answers.length>3 && checkIfValidQuizQuestion(question));
    for (let i = array.length - 1; i > 0; i--)
    {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return(array);
}
getRandomQuestions=()=>{
    return new Promise((resolve,reject)=>{
        fetch('http://localhost:4000/api/questions').then(x=>x.json()).then(x=>{
            var shuffled = shuffleArray(x);
            resolve(shuffled.slice(0,10));
        })
    }) 
}
//SOCKET.IO SETUP
io.on('connection',(client)=>{
    clients[`${client.id}`]=client;
    console.log(clients[`${client.id}`]);
    console.log('Client connected. Connected: ' + Object.keys(clients).length)
    client.on('disconnect',(socket)=>{
        delete clients[`${socket.id}`];
        console.log(`Disconnected:=>Connected clients:${Object.keys(clients).length}`);
    })
    var foundRoom=null;
    rethinkdb.db('refereeder').table('quizrooms').run(rethinkConn).then(x=>{
        x.toArray().then(x=>{
            x.forEach(element=>{
                if(!element.player2){
                    foundRoom=element;
                }
            })
            if(!foundRoom){
                getRandomQuestions().then((questions)=>{
                    var newRoom={
                        player1:{socket_id:client.id,uid:client.handshake.query['uid']},
                        player2:null,
                        questions:questions}
                    rethinkdb.db('refereeder').table('quizrooms').insert(newRoom).run(rethinkConn).then(result=>{
                        newRoom.id=result.generated_keys;
                        client.emit('newRoom',newRoom);
                    })
                })
            }
            else{
                rethinkdb.db('refereeder').table('quizrooms').get(foundRoom.id).update({player2:{socket_id:client.id,uid:client.handshake.query['uid']}}).run(rethinkConn).then(result=>{
                        client.emit('connectedToRoom',foundRoom);
                        io.emit('connectedToRoom_' + foundRoom.id, client.id);
                })
            }
        });
    })
    client.on('message',(message)=>{
        io.emit('message',message);
    })
})
function initRethinkdb()
{
    rethinkdb.connect(rethinkConf).then(x=>{
        rethinkConn=x;
        console.log('Rethinkdb initialized...');
    }).catch(err=>{
        console.log(err);
    });
}
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
    graphQlQuestionCtr.initGraphQl(app).then(()=>{
        console.log('GraphQL Questions initialized...');
    });
}

//Endpoints setup
app.post('/api/login',(req,res)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.password).then(x=>{
        res.end(x.user.uid);
    }).catch(err=>{console.log(err.message);res.end(null)});
})
app.post('/api/forgotpass',(req,res)=>{
    firebase.auth().sendPasswordResetEmail(req.body.email).then(()=>{
        res.end(null);
    })
})
//Final setup
//GET all rules
app.get('/api/rules',(req,res)=>{
    ruleCtr.getRules((err,result)=>{
        if(err)
        {
            res.status(500);
            res.end('FAIL');
        }
        else res.end(result);
    })
})
//RESTful api for USERS
app.get('/api/users/:uid',(req,res)=>{
    userCtr.getUserByID(req.params.uid,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.end(result);
    })
})
app.delete('/api/users/:id',(req,res)=>{
    userCtr.deleteUser(req.params.id,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');
    })
})
app.post('/api/users',(req,res)=>{
    var user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        city:req.body.city,
        dateOfBirth:req.body.dateOfBirth,
        email:req.body.email
    };
    user.goodAnswers=0;
    user.badAnswers=0;
    user.testsTaken=[],
    user.quizzesTaken=[];
    firebase.auth().createUserWithEmailAndPassword(user.email,req.body.password).then(x=>{
        user.uid=x.user.uid;
        userCtr.insertUser(user,(err,result)=>{
            console.log(err);
            if(err) res.status(500);
            else res.status(200);
            res.end('SUCCESS');
        })
    }).catch(err=>{
        res.status(500);
        res.json(err);
        console.log(err.message);
    });
})
app.post('/api/users/:id/quiz', (req,res)=>{
    userCtr.updateAnswers(req.params.id, req.body, (err, result)=>{
        if(err) res.status(500);
        else{
            res.status(200)
            res.json(result);
        }
    });
})
//RESTful api for Questions
app.delete('/api/questions/:id',(req,res)=>{
    questionCtr.deleteQuestion(req.params.id,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');
    })
})
app.post('/api/questions',(req,res)=>{
    var newQuestion={
        number:req.body.questionNumber,
        question:req.body.question,
        ruleNumber:req.body.ruleNumber,
        answers:[],
        rulesReference:[]
    };
    //console.log(newQuestion);
    questionCtr.insertQuestion(newQuestion,(err,result)=>{
        if(err) res.status(500);
        else res.status(200);
        res.send('SUCCESS');
    })
})
app.get('/api/questions',(req,res)=>{
    questionCtr.getQuestions((err,result)=>{
        if(err) {
            res.status(500);
            res.send('FAIL');
        }
        else res.end(result);
    })
})
app.get('/api/questions/:id',(req,res)=>{
    questionCtr.getQuestionByID(req.params.id,(err,result)=>{
        if(err){
            res.status(500);
            res.send('FAIL');
        }
        else res.end(result);
    })
})
app.post('/api/questions/:id/answers',(req,res)=>{
    var data=req.body;
    var answer={
        answer:req.body.answer,
        correct:req.body.correct?true:false,
    };
    questionCtr.insertAnswer(req.params.id,answer,(err,result)=>{
        if(err) 
        {
            console.log(err);
            res.status(500);
        }
        else res.status(200);
        res.send('SUCCESS');
    });
})
app.delete('/api/questions/:id/answers/:subid',(req,res)=>{
    questionCtr.deleteAnswer(req.params.id,req.params.subid,(err,result)=>{
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
    var rule={
        number:req.body.number,
        name:req.body.name,
        title:req.body.title,
        text:req.body.text,
        dashRules:[],
        numRules:[]
    };
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
    initRethinkdb();
    console.log(`Server started on port ${port}`);
})