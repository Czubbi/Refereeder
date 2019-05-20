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
        conn.find().sort({"number":1}).collation({locale: "en_US", numericOrdering: true}).toArray((err, docs)=>{
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
            if(err) callback(err,null)
            else callback(null,result)
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
    insertSubRule(id,subrule,callback){
        subrule._id=ObjectId();
        conn.findOne({"_id":ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else{
                result.lang.eng.subRules.push(subrule);
                conn.replaceOne({"_id":ObjectId(id)},result,(error,res)=>{
                    if(error) callback(error,null);
                    callback(null,res);
                })
            }
        })
    }
    deleteSubRule(id,subid,callback){
        conn.findOne({"_id":ObjectId(id)},(err,result)=>{
            if(err) callback(err,null);
            else{
                let newSubrules=null;
                newSubrules = result.lang.eng.subRules.filter(x=>{return x._id!=subid});
                result.lang.eng.subRules=newSubrules;
                conn.replaceOne({"_id":ObjectId(id)},result,(error,res)=>{
                    if(error) callback(error,null);
                    callback(null,res);
                })
            }
        })
    }
}

module.exports = RuleController;