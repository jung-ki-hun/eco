// 정규식 전용 클래스 작성
// null 값 찾아보기
const webhook = require('webhook-discord');

const Hook = new webhook.Webhook(process.env.WEB_HOOK);
///
var isEmpty = (str) => {

    if (typeof str == "undefined" || str == null || str == "")
    return true;
else
    return false;
}
var date_time  =() =>{ 
const date = new Date();
var str = date;
    return str;
}
var date_ymd  =() =>{ 
const date = new Date();
var str = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    return str;
}

var sendMessage = (str,info) =>{

}

module.exports = {
isEmpty,
date_time,
date_ymd,

}
// log save 