require("dotenv").config();

const config = {
 app:{
     host:process.env.T_HOST || '127.0.0.1'
 },
 db:{}
}
module.exports = config;