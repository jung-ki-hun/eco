require("dotenv").config();

const config = {
 app:{
     host:process.env.T_HOST || '127.0.0.1',
     port:process.env.T_PORT || '3000',
     db_host:process.env.DB_IP || '127.0.0.1'
 },
 db:{}
}
module.exports = config;