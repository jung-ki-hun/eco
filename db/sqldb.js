const mysql = require('mysql');
//const dataset = require('./app.js');
//var argv_ip  = process.argv[2]
var db_info = {
    host: process.env.DB_IP,//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
    port: process.env.DB_PORT,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
}
var response = {
    state: 1,  //sql 탐색도중에러 0/sql  결과 없음 1/sql 결과 조회 성공 2
    query: null,
    msg: 'Succesful'
}
module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    },
    clsose: function (conn) {
        conn.disconnect(function (err) {
            if (err) {
                console.error('mysql connection error : ' + err);
            }
            else {
                console.log('mysql connection disconnectting');
            }
        });
    },
    getConnection: function () {
        return db_info;
    }//,
    // selectSql: (sql, errmsg, succmsg, params) => {
    //     let conn = this.init();
    //     this.connect(conn)
    //     conn.query(sql, params, (err, rows) => {
    //         if (err) {
    //             console.error(`${jkh_fun.date_time()} : ${errmsg} => ${err}`);
    //             response.state = 0;
    //             return response;
    //         }
    //         else {
    //             try {
    //                 if (jkh_fun.isEmpty(results)) {
    //                     console.log(`${jkh_fun.date_time()} : ${errmsg}`);
    //                     response.query = false;
    //                     response.msg = 'failed';
    //                     response.state = 1;
    //                     return response;
    //                 }//조회 실패
    //                 else {
    //                     var resultsTojson = JSON.stringify(results);
    //                     console.log(`${jkh_fun.date_time()} : ${succmsg} => good!`);
    //                     response.query = resultsTojson;
    //                     response.msg = 'Succesful';
    //                     response.state = 2;
    //                     return response;
    //                 }
    //             } catch (e) {
    //                 console.log(`${jkh_fun.date_time()} : ${errmsg} ->  ${e}  // db조회중 오류 발생`);
    //             }
    //         }
    //     })
    
}
