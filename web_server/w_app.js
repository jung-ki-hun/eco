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

var iplist = [];
const iplist_maker = (list) => {
	//file 읽어 와서 배열화 시키는 함수 로직 구성
	//기존의 iplist에 add해주는 방식!!
	const data = jkh_f.file_r('./web_server/api/lib', 'config');
	if (jkh_f.isEmpty(data)) { //null 이면
		return iplist;
	} else {
		var ip = data.split(' '); //save_data lode	
		iplist.push(ip);//save
	}
	return iplist;
}
app.use(ipfilter(iplist_maker()));//디폴트 deny //https://www.npmjs.com/package/express-ipfilter
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
	// var rrq_ip = jkh_f.ip_denying(req);
	// if (rrq_ip.state == 1) {
	// 	iplist.push(rrq_ip.ip);
	// 	console.log(`ip 차단 : ${rrq_ip.ip}`);
	// 	jkh_f.webhook('warn', `${req.ip} country api '/' enter and denying`);
	// 	let str = rrq_ip.ip + ' ';
	// 	jkh_f.file_a('./web_server/api/lib', 'config', str); //경로 파일명 인자를 파래메타로 전달 // 전달된 파라메타를 바탕으로 파일에 추가
	// }
	// else {
	// 	const str = 'web server gate';
	// 	jkh_f.webhook('success', `${req.ip} web '/' enter`);
	 	res.redirect(302, '/w/user/index.html');
	//}//ip 확인
	// if(req.cookies())//쿠기로 확인
	// {

	// }//로그인 유무확인해서 로그인 페이지 접근 제한걸기//로그인 했을때
	// else{

	// }//로그인
});//버그 수정해야됨//


var errorHandler = expressErrorHandler({
	static: {
		'400': './web_server/web/error/400.html',
		'401': './web_server/web/error/401.html',
		'402': './web_server/web/error/402.html',
		'403': './web_server/web/error/403.html',
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

