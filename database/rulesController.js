const dbConnection = require('../database/db.js')
var conn = {};
var ObjectId = require('mongodb').ObjectID;

class RuleController{
    constructor(){
        dbConnection.connectToDb('Rule').then(()=>{
            conn=dbConnection.get();
        }).catch(err=>{console.log(err)});
    }

    //Get all rules 
    getRules(callback){
        conn.find({}).toArray((err, docs)=>{
            if(err) callback(err,null)
            else callback(null,JSON.stringify(docs))
        })
    }

    //Get one rule by ID
    getRuleByID(id,callback){
        conn.findOne({"_id":ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }
    getRuleByNumber(number,callback){
        conn.findOne({"number":number},(err,result)=>{
            if(err) callback(err,null);
            else callback(null,JSON.stringify(result));
        })
    }
    //Insert one rule
    insertRule(rule, callback){
        conn.insertOne(rule, (err, result)=>{
            if(err) callback(err)
            else callback(result)
        })
    }

    //Delete one rule
    deleteRule(id,callback){
        conn.deleteOne({"_id" : ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else{
                callback(null,result);
            }
        })
    }

}

module.exports = RuleController;