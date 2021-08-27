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
//    006+0
// };
const db_info = require("../api/v1/function/jkh_config.js")//설정관련 데이터
const SQL = require("sql-template-strings");
const { Pool, Client } = require('pg');
const pool = new Pool(db_info.pgdb);
Client.prototype.query = function push(...rest) {
    const { stack } = new Error();
    const callback = rest[2];
  
    // Callback 일 때
    if (callback) {
      // eslint-disable-next-line no-param-reassign
      rest[2] = function wrapper(error, res) {
        if (error) {
          // eslint-disable-next-line no-param-reassign
          error.message += `\nFrom previous event:\n${stack}`;
        }
        callback(error, res);
      };
  
      return clientQueryRunner.call(this, ...rest);
    }
  
    // Promise 일 때
    return clientQueryRunner.call(this, ...rest).catch((error) => {
      // eslint-disable-next-line no-param-reassign
      error.message += `\nFrom previous event:\n${stack}`;
      throw error;
    });
  };
module.exports = {
    getConnection: function () {
        return db_info.gpdb;
    },
    pool, //= pool_set.init(),
    Q(string, ...rest) {
        return SQL(string, ...rest.map(((x) => (typeof x === object && x !== null ? JSON.stringify(x) : x))))
    }///쿼리 만드는 거

}