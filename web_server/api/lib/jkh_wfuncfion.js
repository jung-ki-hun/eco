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
/* bk설명
str의 모든 데이터를 매개 변수로 받는다
str의 데이터를 i_str로 하나씩 for문으로 진행시키면서
i_str이 undefined 이거나 null 이거나 빈텍스트라면 true를 아니면 false를 리턴
*/

const dataset = {
    port: process.env.PORT,
    host: process.env.T2_HOST
}

/* bk설명
dataset이라는 변수?객체?에 port는 process.env.Port의 데이터를,
host는 process.env.T2_Host의 데이터를 넣는다.
*/


const appRoot = require("app-root-path");
/********************************
 * **********시간 관련함수********
*********************************/
var date_time = () => {
    const date = new Date();
    var str = date;
    return str;
}

/* bk설명
date_time이라는 함수는 
date의 변수에 new Date()를 통해 날짜 값을 가져온다
그 날짜값을 str에 넣고 리턴한다
*/


var date_ymd = () => {
    const date = new Date();
    const sring_Regular = ' ';
    var str = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    return str;
}


/* bk설명
date_ymd라는 함수는 date에 날짜 값을 넣고
str에 년 월 일? 을 넣고 리턴한다
*/

/********************************
 * ***********로그 관리***********
*********************************/
var rfs = require('rotating-file-stream');//로그 하루단위로 절샥
const logstream = rfs.createStream(`access.log`, {
    interval: '1d',
    path: `${appRoot}/web_server/log` });
const webhook = require('./jkh_wwebhook');

/* bk설명
rfs로 stream을 불러와? logstream에 stream을 만들고  access.log라는 파일명으로,
interval에는 1d라는 값, 경로는  web_server/log로?설정

*/




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
        state:0
    }
    if(geo != null && geo.country != 'KR'){
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