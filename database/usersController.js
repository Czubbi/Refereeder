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
        conn.findOne({"_id":ObjectId(id)},(err,result)=>{
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

}

module.exports = UserController;