const express = require('express');
const app = express();
var expressErrorHandler = require('express-error-handler');
var jkh_f = require('./api/lib/jkh_wfuncfion');
var jkh = require('./api/lib/jkh_wconfig')//jkh_wconfig에서 config를 호출하기위한 변수
var path = require('path');
var static = require('serve-static');
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const ipfilter = require('express-ipfilter').IpFilter
var iplist =[];
app.use(ipfilter(iplist));//디폴트 deny //https://www.npmjs.com/package/express-ipfilter
app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());

app.use(morgan('combined', { stream: jkh_f.logstream }))//로그파일로 관리 함
app.use('/', require('./api/router.js'));
app.use('/w', static(path.join(__dirname, 'web')));//웹페이지 미들웨어
/*const dataset = {
	port: process.env.T2_PORT ||"80",
	host: process.env.T3_HOST ||"192.168.219.107" 
}*/

app.get('/', (req, res) => {
	var rrq_ip = jkh_f.ip_denying(req);
	if (rrq_ip.state == 1) {
		iplist.push(rrq_ip.ip);
		console.log(`ip 차단 : ${rrq_ip.ip}`);
		jkh_f.webhook('warn', `${req.ip} web '/' enter and denying`);
	}
	const str = 'web server gate';
	jkh_f.webhook('success', `${req.ip} web '/' enter`);
	res.redirect(302, '/w/user/index.html');
});

/*bk설명
rrq_ip의 변수에 jkh_f의 폴더에 ip_denying라는 함수에 받은값(req)를 넣어 반환값을 저장,
1)그 반환값이 1일경우 
iplist의 배열에 rrq_ip의 ip를 푸쉬, log로 차단한 ip표시, jkh_f파일의 webhook함수에 warn과 메세지 전달 하고 아래 설명까지 추가

2)그 반환값이 1이 아닐경우 if문의 내용을 제외하고 여기서부터 시작
const str은 사용되지않아서 잘 모르겠습니다.
jkh_f의 파일의 webHook에 success와 req의 ip를 전달
전송하는? res 매개변수의 redirect에 status 넘버 302 와 url전송  //이부분은 무슨 의미인지는 잘모르겠지만 매개변수를 통해 추측
*/


var errorHandler = expressErrorHandler({
	static: {
		'404': './web_server/web/error/404.html',
		'500': './web_server/web/error/500.html'
	}
})
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.listen(jkh.config.app.port, jkh.config.app.host, () => {
	console.log(`${jkh.config.app.host}:${jkh.config.app.port} server start!!!`);
	console.log(jkh_f.appRoot);
	jkh_f.webhook('info', `open web server`);
	jkh_f.webhook('info', `http://${jkh.config.app.host}:${jkh.config.app.port}/`);

});

/* bk설명
잘 모르겠으나 errorHandler에 404의 번호가 뜰때는 404.html이 표시되도록
500일경우 500.html이 표시되도록 설정한것 처럼 보임.
app의 listen 함수가 무슨일을 하는지는 잘 모르겟지만 port번호, host이름을 매개변수로 넣어 
로그를 띄운다 host,포트 그리고 서버시작, appRoot, 그리고 jkh_f파일의 webhook폴더에 메세지 전달
*/