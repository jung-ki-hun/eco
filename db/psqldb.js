//const vals = require('./const.js');
// const { Pool, Client } = require('pg');
// const client = new Client({
//     user: vals.user,
//     password: vals.pass,
//     host: vals.host, port: vals.port, database: vals.db
// });
// const ss;
// client.connect();
// client.query(SQL``, (err, res) => {
//     console.log(res); client.end();
// })
// const pool_set = {
//     init: () => {
//         const { Pool, Client } = require('pg');
//         const client = new Pool(db_info.db);
//         return client
//     },
//     connect: (conn) => {
//         conn.connect((err) => {
//             if (err) console.log(err);
//             else console.log("postgre successfully!");
//         });
//     }
// };
const db_info = require("../api/v1/function/jkh_config.js")//설정관련 데이터
const SQL = require("sql-template-strings");
const { Pool, Client } = require('pg');
const pool = new Pool(db_info.pgdb);
//const pool = pool_set.connect(pool_set.init());
// pool.prototype.query = function push (..rest)=>{

// }
module.exports = {
    getConnection: function () {
        return db_info.db;
    },
    pool, //= pool_set.init(),
    Q(string, ...rest) {
        return SQL(string, ...rest.map(((x) => (typeof x === object && x !== null ? JSON.stringify(x) : x))))
    }///쿼리 만드는 거

}