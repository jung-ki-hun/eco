const mongoose = require('mongoose'); // 몽구스 라이브러리
const autoIncrement = require('mongoose-auto-increment'); //자동카운트 라이브러리 
const jkh_c = require('../api/v1/function/jkh_config.js'); //설정
const jkh_f = require('../api/v1/function/jkh_function'); // 기본함수
const url = `${jkh_c.nodb.url}:${jkh_c.nodb.port}/${jkh_c.nodb.database}`; // unl 설정
var db = mongoose.connection;

module.exports = {
    init: () => {
        const connect = ()=>{
        mongoose.connect(url, (err) => {
            if (err) {
                console.error('mongodb connection error', err);
            }
            console.log('mongodb connected');
        });}
        connect();
        //mongoose.connection.on('disconnected', connect);
        autoIncrement.initialize(db); //자동카운트
        db.once('open', function () {
            // CONNECTED TO MONGODB SERVER
            console.log("Connected to mongod server");
        });
        db.on('disconnected', function () {
            console.log('데이터베이스 연결 끊어짐.')
            connect();
        });
        db.on('error', console.error);
        //this.init();
        
        return mongoose;
    }
    // save:(data, type)=>{ //데이터, 저장위치 확인 // type -> 1 질문하기 2 자랑하기
    //     if(type == 1){
    //         let j_data = new schema_j();
    //         j_data.context_id 
    //         j_data.name = data.name;
    //         j_data.id = data.id;
    //         j_data.create_d = data.date;
    //         j_data.title = data.title;
    //         j_data.content = data.content;
    //         j_data.save((err)=>{
    //             console.log(err);
    //             jkh_f.webhook('err','게시글 저장 실패');
    //         });
    //     }//질문하기 저장
    //     else if(type == 2){
    //         let j_data = new schema_j();
    //         // j_data.context_id 
    //         // j_data.name = data.name;
    //         // j_data.id = data.id;
    //         // j_data.create_d = data.date;
    //         // j_data.title = data.title;
    //         // j_data.content = data.content;
    //         j_data = data;
    //         j_data.save((err)=>{
    //             console.log(err);
    //             jkh_f.webhook('err','게시글 저장 실패');
    //         });
    //     }//자랑하기 저장
    //     else{
    //         console.log(`type is defind`);
    //         jkh_f.webhook('err',`type is defind`);
    //     }//type 값저장
    // },
    // find:(query)=>{
    //     Model.find(query,(err,docs)=>{
    //         if(err){
    //             console.log(err);
    //             jkh_f.webhook('err',`have not data`);
    //         }
    //         return docs;
    //     });
    // },
    // addcommand:async (context,query)=>{
    //     let sql = query;//게시판 데이터에 커멘드 추가 
    //     var context = this.find();//게시글 불러오기


    // }
}//code