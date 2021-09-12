const jkh_key = require('./jkh_wconfig');
/********************************
 * ************기본함수 **********
 *********************************/
var isEmpty = (...str) => { //null을 대신해 비어있음을 확인
    for (let i_str of str) {
        if (typeof i_str == "undefined" || i_str == null || i_str == "" )
            return true;
        else
            return false;
    }
}
var isNan = (...num) =>{
    for (let i_str of str) {
        if (typeof i_str == "undefined" || i_str == null || i_str == NaN )
            return true;
        else
            return false;
    }
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
var webhook = require("./jkh_wwebhook");
var fs = require('fs');
var rfs = require('rotating-file-stream');//로그 하루단위로 절샥
const logstream = rfs.createStream(`access.log`, {
    interval: '1d',
    path: `${appRoot}/log/log` });


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

/********************************
 * ********** 파일생성  ***********
*********************************/

const file_r = (path,name,data)=>{ //읽기
    let str = `${path}/${name}.txt`;
    const file = fs.readFile(str,(err)=>{
        if(isEmpty(err)){
            console.log("파일 읽기 성공");
        }
        else{
            console.log("파일 읽기 실패 : " + err);
        }
    });
}
const file_w = (path,name,data)=>{ //쓰기
    let str = `${path}/${name}.txt`;
    const file = fs.writeFile(str, data,'utf8',(err)=>{
        if(isEmpty(err)){ //undifind
            console.log("파일 생성 성공");
        }
        else{
            console.log("파일 생성 실패 : " + err);
        }
    });
}
const file_a = (path,name,data)=>{
    let str = `${path}/${name}.txt`;
    const file = fs.appendFile(str,data,(err)=>{
        if(isEmpty(err)){ //undifind
            console.log("파일 생성 성공");
        }
        else{
            console.log("파일 생성 실패 : " + err);
        }
    });
}

module.exports = {
    isEmpty,
    isNan,
    date_time,
    date_ymd,
    webhook,
    ip_denying,
    file_r,
    file_w,
    file_a,
    appRoot,
    logstream,

}//log save