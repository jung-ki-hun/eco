require("dotenv").config();
// import dotenv from 'dotenv';
// dotenv.config();
const config = {
    app: {
        host: process.env.T3_HOST || '192.168.219.107',
        port: process.env.T_PORT || '4000'
    },
    db: {
        host: process.env.DB_IP || "127.0.0.1",//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_ID || "postgre",
        password: process.env.DB_PW || "rlgns123",
        database: process.env.DB_NAME || "projectb",
    },
    mysql: {
        host: process.env.SDB_IP || "127.0.0.1",//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
        port: process.env.SDB_PORT || "3306",
        user: process.env.SDB_ID || "root",
        password: process.env.SDB_PW || "rlgns123",
        database: process.env.SDB_NAME || "projectb",
    },
    nodb: {

        url: process.env.MONDB_URL || "",
        port: process.env.MON_PORT || "",
        database: process.env.MON_NAME || "",
        id: process.env.MON_ID || "",
        password: process.env.MON_PW || ""

    },
    hook: {
        url: process.env.WEB_HOOK || "",
    }
}
var argv_ip = process.argv[2];
module.exports = {
    config
};