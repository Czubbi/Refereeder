var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://admin:Password1!@refereed-qcutu.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var db={};
function connectToDb(collection,callback){
    client.connect(err => {
        if(err) return(err);
        else
        {
            db=client.db('RefereedDB').collection(collection);
            callback();
        } 
    });
}
function get(){
    return db;
}
function close(){
    db.close();
}
module.exports = {
    connectToDb,
    get,
    close
};