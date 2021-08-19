const mongoose = require('mongoose');
const jkh_c = require('../api/v1/function/jkh_config.js');
const url = `${jkh_c.config.nodb.url}/ ${jkh_c.config.nodb.database}`;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

//schema ~~!!
const command = new mongoose.Schema({
    command_id:{type:OdjectId,require:true,unique:true},
    name : {type:String,require:true},
    create_d:{type:Date,require:true},
    contents:{type:String,require:true}
});//뎃글
const context = new mongoose.Schema({
    context_id:{type:OdjectId,require:true,unique:true},
    name : {type:String,require:true},
    id : {type:String,require:true},
    create_d : {type:Date,require:true},
    title : {type:String,require:true},
    content : {type:Buffer,require:true},
    command : [command]
});//게시글

mongoose.connect(url);
module.exports = {
    init: () => {

        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Successfully connected to mongodb'))
            .catch(e => console.error(e));
    },
    connect: () => {
        const database = mongoose.connection;
        database.on('open', ()=>{
            console.log('mongodb connect!!');
            mongoose.model('context',context);
        })
        database.on('disconnected',()=>{
            this.init();
        })
    },

}