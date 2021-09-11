const jkh_key = require('./jkh_config');
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
const appRoot = require("app-root-path");//진입점 루트함수
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
    var str = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    return str;
}

/********************************
 * ************암호화************
*********************************/
var crypto = require('crypto');
//var shasum = crypto.createHash('sha256');
var iv = Buffer.alloc(16,0);
var key =crypto.scryptSync(jkh_key.app.ckey,'salt',32); //'$!@T!EFQT@#%!#TWGW@T!#@%^';// 비밀키
var cipher = (password) => {
    var cc = crypto.createCipher('aes192', key);
    cc.update(password, 'utf-8', 'base64');
    var cipstr = cc.final('base64');
    return cipstr;
}//암호화 함수

var dcipher = (password) => {
    var dc = crypto.createDecipheriv('aes192', key);
    dc.update(password, 'base64', 'utf-8');
    var dcipstr = dc.final('utf-8');
    return dcipstr;
}//복호화 함수
////////////////////////////////////////////

var cipheriv = (password) => {
    var cc = crypto.createCipheriv(jkh_key.app.carl,key,iv);//return -> cipher
    cc.update(password, 'utf-8', 'base64');
    var cipstr = cc.final('base64');
    return cipstr;
}//암호화 함수

var dcipheriv = (password) => {
    var dc = crypto.createDecipheriv(jkh_key.app.carl, key,iv);
    dc.update(password, 'base64', 'utf-8');
    var dcipstr = dc.final('utf-8');
    return dcipstr;
}//복호화 함수

/********************************
 * ***********로그 관리***********
*********************************/
var webhook = require("./jkh_webhook");
var fs = require('fs');
var rfs = require('rotating-file-stream');//로그 하루단위로 절샥
const logstream = rfs.createStream(`access.log`, {
    interval: '1d',
    path: `${appRoot}/log/log` });

/********************************
 * ***********token ***********
*********************************/
const jwt = require('jsonwebtoken');
const createToken =  (user_id)=>{
const token = jwt.sign({user_id: user_id}, jkh_key.app.key, {expiresIn: '1h'});
    return token;
}
/********************************
 * ***********ip 차단 ***********
*********************************/
var geoip = require('geoip-country'); // 대상 찾기용
//var ipfiter = require('express-ipfilter').ipfiter; //벤용
//const { query } = require('express');
//국가 단위로 찾아보기
const ip_denying = (req)=>{
    let ip = req.ip; //->ip를 받아와서
    let geo = geoip.lookup(ip); //-> 내부 모듈 
    var return_data ={
        ip:ip,
        state:0,
        country: geo.country
    }
    if(geo != null && geo.country != 'KR'){
        return_data.state =1;
        return return_data;
    }
    else{
        return return_data;
    }
}
/********************************
 * ********** 페이징  ***********
*********************************/
const pageid =(query,offset,limit)=>{
    const result = {
        offset: 0, // 시작 인덱스
        limit: Number(limit), // 조회할 갯수
        count: 0, // 전체 열 갯수
      };
      //if()
      //
      return result;
}
/********************************
 * ********** 파일생성  ***********
*********************************/

const file_r = (path,name)=>{ //읽기
    let str = `${path}/${name}.txt`;
    const file = fs.readFile(str,(err,data)=>{
        if(isEmpty(err)){
            console.log("파일 읽기 성공");
            return data;
        }
        else{
            console.log("파일 읽기 실패 : " + err);
            return null;//사용하기전에 isnull체크 필수 
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
}//신규 파일이나 파일 전체 갱신후 생성시 사용
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
}//파일에 데이터 추가용 함수

module.exports = {
    isEmpty,
    isNan,
    date_time,
    date_ymd,
    cipher,
    dcipher,
    cipheriv,
    dcipheriv,
    webhook,
    createToken,
    pageid,
    ip_denying,
    file_r,
    file_w,
    file_a,
    appRoot,
    logstream,

}//log save