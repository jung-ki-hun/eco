require("dotenv").config();

const config = {
 app:{
     host:process.env.T_HOST || '127.0.0.1',
     port:process.env.T_PORT || '3000',
     db_host:process.env.DB_IP || '127.0.0.1'
 },
 db:{
    host: process.env.DB_IP || "127.0.0.1",//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_ID || "root",
    password: process.env.DB_PW || "rlgns123",
    database: process.env.DB_NAME|| "projecta",
 }
}
module.exports = {
    config,
};