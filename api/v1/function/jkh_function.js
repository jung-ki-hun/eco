var isEmpty = (...str) => {
    for(let i_str of str){
    if (typeof i_str == "undefined" || i_str == null || i_str == "")
        return true;
    else
        return false;
    }
}
var date_time = () => {
    const date = new Date();
    var str = date;
    return str;
}
var date_ymd = () => {
    const date = new Date();
    const sring_Regular = ' ';
    var str = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    return str;
}

/********************************
 * ************암호화************
*********************************/
var crypto = require('crypto');
var shasum = crypto.createHash('sha256');
var key = '$!@T!EFQT@##!@$$%!#TWGW@T!#@%^';// 비밀키
var cipher = (password)=>{
    var cc = crypto.createCipher('aes192',key);
    cc.update(password,'utf-8','base64');
    var cipstr = cc.final('base64');
    return cipstr;
}//암호화 함수

var dcipher = (password)=>{
    var dc = crypto.createDecipheriv('aes192',key);
    dc.update(password, 'base64','utf-8');
    var dcipstr = dc.final('utf-8');
    return dcipstr;
}//복호화 함수

var webhook =require("./jkh_webhook");

module.exports = {
    isEmpty,
    date_time,
    date_ymd,
    cipher,
    dcipher,
    webhook,

}
// log save 