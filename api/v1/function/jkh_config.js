require("dotenv").config();
const config = {
    app: {
        host: process.env.T3_HOST || '192.168.219.107',
        port: process.env.T_PORT || '4000',
        key: process.env.SECRET_KEY || '!%@^^!&#$',
        ckey: process.env.CRYPTO_KEY ||'!@!#!@%&^YSDJFS!@$!',
        carl: process.env.CRYPTO_ARL || 'aes-256-cbc'
    },
    pgdb: {
        host: process.env.DB_IP || "127.0.0.1",
        port: process.env.DB_PORT || "5432",
        user: process.env.DB_ID || "postgres",
        password: process.env.DB_PW || "rlgns123",
        database : process.env.DB_NAME || "projectb"
    },
    mysql: {
        host: process.env.SDB_IP || "127.0.0.1",//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(),
        port: process.env.SDB_PORT || "3306",
        user: process.env.SDB_ID || "root",
        password: process.env.SDB_PW || "rlgns123",
        database: process.env.SDB_NAME || "projectb",
    },
    nodb: {

        url: process.env.MON_URL || "mongodb://127.0.0.1",
        port: process.env.MON_PORT || "27017",
        database: process.env.MON_NAME || "projectb",
        id: process.env.MON_ID || "",
        password: process.env.MON_PW || ""

    },
    hook: {
        url: process.env.WEB_HOOK || "",
    },
    naver:{
        url: process.env.WEB_HOOK || "",
    },
    kakao:{
        url: process.env.KAKAO_URL || "",
        admin: process.env.KAKAO_ADMIN || "",
        appkey: process.env.KAKAO_APP || "",
        apikey: process.env.KAKAO_API || "",
        jskey: process.env.KAKAO_JS || ""
    },
    err:{
        ERR_IP_NOT_COUNTRY:{
            status: 401,
            message: "The country is inaccessible"
        },
        ERR_DB_DONT_SAVE:{
            status: 200,
            message: "DB inquiry failed"
        },
        ERR_DB_EMPTY_DATA:{
            status: 0,//false
            message: "DB data empty"
        },
        ERR_UESR_NOT_ACCREDIT:{
            status: 403,
            message: "I can't find the user."
        }
    }    
}
module.exports = config;
