require("dotenv").config();

const config = {
 app:{
     host:process.env.T_HOST || '127.0.0.1',
     port:process.env.T_PORT || '3000'
 },
 db:{}
}
module.exports = config;