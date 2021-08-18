/********************************
 * ************기본함수 **********
 *********************************/
 var isEmpty = (...str) => {
    for (let i_str of str) {
        if (typeof i_str == "undefined" || i_str == null || i_str == "")
            return true;
        else
            return false;
    }
}
const dataset = {
    port: process.env.PORT,
    host: process.env.T2_HOST
}
const appRoot = require("app-root-path");
/********************************
 * **********시간 관련함수********
*********************************/
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
 * ***********로그 관리***********
*********************************/
var rfs = require('rotating-file-stream');//로그 하루단위로 절샥
const logstream = rfs.createStream(`access.log`, {
    interval: '1d',
    path: `${appRoot}/log` });
     
module.exports = {
    isEmpty,
    date_time,
    date_ymd,
    appRoot,
    logstream,

}
// log save