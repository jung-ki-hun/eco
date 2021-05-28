const mysql = require('mysql');
//const dataset = require('./app.js');
var argv_ip  = process.argv[2]
var db_info = {
    host: argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
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
                console.log('mysql connection disconnectting');
            }
        });
    },
    getConnection: function(){
        return db_info;
    }
}
