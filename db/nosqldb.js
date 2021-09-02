const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const jkh_c = require('../api/v1/function/jkh_config.js');
const jkh_f = require('../api/v1/function/jkh_function');
const url = `${jkh_c.config.nodb.url}/ ${jkh_c.config.nodb.database}`;
var db = mongoose.connection;
autoIncrement.initialize(mongoose.connection);
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
    context_id:{type:Number,require:true,unique:true},
    name : {type:String,require:true},
    id : {type:String,require:true},
    create_d : {type:Date,require:true},
    title : {type:String,require:true},
    content : {type:Buffer,require:true},
    command : [command]
});//게시글

//auto-increment
context.plugin(autoIncrement.plugin,{
    
}) // 자동 카운트

const schema_j = mongoose.models('boast',context); //자랑하기 
const schema_q = mongoose.models('qnalist',context); //질문하기
module.exports = {
    init: () => {
       mongoose.connect(url, (err)=>{
        if (err) {
            console.error('mongodb connection error', err);
          }
          console.log('mongodb connected');
       });
       this.init();
       mongoose.connection.on('disconnected', connect);
    },
    save:(data, type)=>{ //데이터, 저장위치 확인 // type -> 1 질문하기 2 자랑하기
        if(type == 1){
            let j_data = new schema_j();
            j_data.context_id 
            j_data.name = data.name;
            j_data.id = data.id;
            j_data.create_d = data.date;
            j_data.title = data.title;
            j_data.content = data.content;
            j_data.save((err)=>{
                console.log(err);
                jkh_f.webhook('err','게시글 저장 실패');
            });
        }//질문하기 저장
        else if(type == 2){
            let j_data = new schema_j();
            // j_data.context_id 
            // j_data.name = data.name;
            // j_data.id = data.id;
            // j_data.create_d = data.date;
            // j_data.title = data.title;
            // j_data.content = data.content;
            j_data = data;
            j_data.save((err)=>{
                console.log(err);
                jkh_f.webhook('err','게시글 저장 실패');
            });
        }//자랑하기 저장
        else{
            console.log(`type is defind`);
            jkh_f.webhook('err',`type is defind`);
        }//type 값저장
    },
    find:(query)=>{
        Model.find(query,(err,docs)=>{
            if(err){
                console.log(err);
                jkh_f.webhook('err',`have not data`);
            }
            return docs;
        });
    },
    addcommand:async (context,query)=>{
        let sql = query;//게시판 데이터에 커멘드 추가 
        var context = this.find();//게시글 불러오기
        

    }
}//code