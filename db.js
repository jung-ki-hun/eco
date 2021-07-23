const mysql = require('mysql');
const db_set = require("./api/v1/function/jkh_config")
//const dataset = require('./app.js');
//var argv_ip  = process.argv[2]
var db_info = {
    host: process.env.DB_IP,
    port: process.env.DB_PORT,    
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
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
                console.log('mysql connection disconnecttingg');
            }
        });
    },
    getConnection: function(){
        return db_info;
    }
}
