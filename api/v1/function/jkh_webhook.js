// 정규식 전용 클래스 작성
// null 값 찾아보기
const webhook = require('webhook-discord');
var stringToUrl = process.env.WEB_HOOK +"";
const Hook = new webhook.Webhook(stringToUrl+"");
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

