const jkh = require('./jkh_function');
const ip_ban = (ip_client,)=>{
    const ip_address  = [];
    const path = './';
    const file_name = 'ip_ban_address';
    ip_address= jkh.file_r(path,file_name).split('\n');

}
module.exports ={
    ip_ban
}