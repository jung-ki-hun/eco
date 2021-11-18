require("dotenv").config();
// import dotenv from 'dotenv';
// dotenv.config();
const config = {
    app: {
        host: process.env.T3_HOST || '127.0.0.1',
        port: process.env.T3_PORT || '3000'
    },
    hook: {
        url: process.env.WEB_HOOK || "",
    }
}
var argv_ip = process.argv[2];
module.exports = {
    config
};