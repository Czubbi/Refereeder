const dbConnection = require('../database/db.js')
var conn = {};
var ObjectId = require('mongodb').ObjectID;

class QuestionController{
    constructor(){
        dbConnection.connectToDb('Questions').then(()=>{
            conn=dbConnection.get();
        }).catch(err=>{console.log(err)});
    }

    //Get all question 
    getQuestions(callback){
        conn.find({}).toArray((err, docs)=>{
            if(err) callback(err,null)
            else callback(null,JSON.stringify(docs))
        })
    }

    //Get one question by ID
    getQuestionByID(id,callback){
        conn.findOne({"_id":ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }
    //Get one question by number
    getQuestionByNumber(number,callback){
        conn.findOne({"number":number},(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }
    //Insert one question
    insertQuestion(question, callback){
        conn.insertOne(question, (err, result)=>{
            if(err) callback(err,null)
            else callback(null,result)
        })
    }
    //Delete one question
    deleteQuestion(id,callback){
        conn.deleteOne({"_id" : ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else{
                callback(null,result);
            }
        })
    }
}

module.exports = QuestionController;