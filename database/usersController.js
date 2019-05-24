const dbConnection = require('../database/db.js')
var conn = {};
var ObjectId = require('mongodb').ObjectID;

class UserController{
    constructor(){
        dbConnection.connectToDb('User').then(()=>{
            conn=dbConnection.get();
        }).catch(err=>{console.log(err)});
    }

    //Get all users 
    getUsers(callback){
        conn.find({}).toArray((err, docs)=>{
            if(err) callback(err,null)
            else callback(null,JSON.stringify(docs))
        })
    }

    getUserByQuery(query,callback){
        conn.findOne(query,(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }
    //Get all users by role
    getUsersByRole(role,callback){
        conn.find({"role": role}).toArray((err,docs)=>{
            if(err) callback(err,null);
            else callback(null,docs);
        })
    }

    //Get one user by ID
    getUserByID(id,callback){
        conn.findOne({"uid":id},(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }

    //Insert one user
    insertUser(user, callback){
        conn.insertOne(user, (err, result)=>{
            if(err) callback(err,null)
            else callback(null,result)
        })
    }

    //Delete one user
    deleteUser(id,callback){
        conn.deleteOne({"_id" : ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else{
                callback(null,result);
            }
        })
    }
    //update number of good and bad answers
    updateAnswers(id,body,callback){
        conn.findOne({"uid" : id}, (err,result)=>{
            if(err) callback(err,null);
            else{
               var goodAnswers=body.answers.filter(x=>x.correct=='true').length;
               var badAnswers=body.answers.filter(x=>x.correct=='false').length;
               var user=result;
               user.goodAnswers=user.goodAnswers+goodAnswers;
               user.badAnswers=user.badAnswers+badAnswers;
               user.quizzesTaken.push(body);
               conn.replaceOne({"uid":id},user,(error,res)=>{
                    if(error) callback(error,null);
                    callback(null,res);
                })
            }
        });
    }
}

module.exports = UserController;