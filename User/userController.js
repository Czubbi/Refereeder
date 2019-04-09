const dbConnection = require('../database/db.js')
var conn = {};
var ObjectId = require('mongodb').ObjectID;

class UserController{
    constructor(){
        dbConnection.connectToDb('User', ()=>{
            conn = dbConnection.get();
        })
    }

    //Get all users 
    getUsers(callback){
        conn.find({}).toArray((err, docs)=>{
            if(err) callback(err)
            else callback(docs)
        })
    }

    //Get all the users with same name
    getUsersByName(name,callback){
        conn.find({"name":{'$regex': name}}).toArray((err,docs)=>{
            if(err) callback(error,null);
            else callback(null,docs);
        })
    }

    //Get all users by role
    getUsersByRole(role,callback){
        conn.find({"role": role}).toArray((err,docs)=>{
            if(err) callback(error,null);
            else callback(null,docs);
        })
    }

    //Get one user by ID
    getUserByID(id,callback){
        conn.findOne({"_id": ObjectId(id)}).toArray((err,docs)=>{
            if(err) callback(error,null);
            else callback(null,docs);
        })
    }

    //Insert one user
    insertUser(user, callback){
        conn.insertOne(user, (err, result)=>{
            if(err) callback(err)
            else callback(result)
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