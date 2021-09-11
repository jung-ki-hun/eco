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
    path: `${appRoot}/web_server/log` });
const webhook = require('./jkh_wwebhook');

/********************************
 * ***********ip 차단 ***********
*********************************/
var geoip = require('geoip-country'); // 대상 찾기용
//var ipfiter = require('express-ipfilter').ipfiter; //벤용
//const { query } = require('express');
//국가 단위로 찾아보기
const ip_denying = (req)=>{
    let ip = req.ip;
    let geo = geoip.lookup(ip);
    var return_data ={
        ip:ip,
        state:0,
        country: geo.country
    }
    if(geo != null && geo.country != 'KR' && ip == '127.0.0.1'){
        return_data.state =1;
        return return_data;
    }
    else{
        return return_data;
    }
}

module.exports = {
    isEmpty,
    date_time,
    date_ymd,
    webhook,
    ip_denying,
    appRoot,
    logstream,

}
// log save