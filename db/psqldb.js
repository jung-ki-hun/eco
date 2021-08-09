const vals = require('./const.js');
const { Pool, Client } = require('pg');
const
const db_info = require("../api/v1/function/jkh_config.js")//설정관련 데이터
const client = new Client({
    user: vals.user,
    password: vals.pass,
    host: vals.host, port: vals.port, database: vals.db
});

client.connect();
client.query('SELECT * FROM users', (err, res) => {

    console.log(res); client.end();
})

module.exports = {
    init: ()=>{
        const { Pool, Client } = require('pg');
        const client = new Client();
        return client(db_info.db_info);
    },
    connect: (conn) => {
        conn.connect((err) => {
            if (err) console.log(err);
            else console.log("postgre successfully");
        });
    },
    getConnection: function () {
        return db_info;
    },
}