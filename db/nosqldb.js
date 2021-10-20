const mongoose = require('mongoose'); // 몽구스 라이브러리
const autoIncrement = require('mongoose-auto-increment'); //자동카운트 라이브러리 
const jkh_c = require('../api/v1/function/jkh_config.js'); //설정
const jkh_f = require('../api/v1/function/jkh_function'); // 기본함수
const url = `${jkh_c.nodb.url}:${jkh_c.nodb.port}/${jkh_c.nodb.database}`; // unl 설정

module.exports = {
    init: () => {
        var db = mongoose.connection;
        console.log(url);
        const connect = () => {
            mongoose.connect(url, (err) => {
                if (err) {
                    console.error('mongodb connection error', err);
                }
                else{
                    console.log('mongodb connected');
                }
            });
        }
        //mongoose.connection.on('disconnected', connect);
        autoIncrement.initialize(db); //자동카운트
        db.once('open', function () {
            // CONNECTED TO MONGODB SERVER
            console.log("Connected to mongod server");
        });
        db.on('disconnected', function () {
            console.log('데이터베이스 연결 끊어짐.')
            connect();  //무한 루프 해결되면 복구
        });
        //db.on('error', console.error);
        
        connect();

        return mongoose;
    }

}//code