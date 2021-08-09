const mongoose = require('mongoose');
const url = 'mongodb://localhost:/';
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
module.exports ={
    init:()=>{
        return mongoose.connection;
    },
    connect:()=>{
        
    },

}