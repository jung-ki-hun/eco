// null 값 찾아보기
const webhook = require('webhook-discord'); //디스코드에 오류 목록 전송
var stringToUrl = process.env.WEB_HOOK +"";
const Hook = new webhook.Webhook("https://discord.com/api/webhooks/876266259103252531/xidU2wyVolJE_077O2Z7FuCyEFdwPQCJ9lPGH2bXwOHrpUcY0SnG7TY1SS2ZBBZPAht6")//stringToUrl+"");
///url 삽입 문제 해결 필요
var sendMessage = (type, msg) => {
    const str = "server_bot";
    switch (type) {
        case 'info':
            Hook.info(str, msg);
            break;
        case 'warn':
            Hook.warn(str, msg);
            break;
        case 'err':
            Hook.error(str,msg);
            break;
        case 'success':
            Hook.success(str, msg);
            break;
        case 'etc':
            const msg_text = new webhook.MessageBuilder().setText(msg_text);
            Hook.send(msg_text);
            break;
        default:
            console.error("do not send discord");
            break;
    }
}//함수

module.exports = sendMessage;