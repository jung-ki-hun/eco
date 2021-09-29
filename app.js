const express = require("express");
const path = require('path');
const morgan = require("morgan");
const passport = require('passport');
const cookieParser = require('cookie-parser'); //쿠키제공
const cors = require('cors');
require('./api/v1/function/jkh_group.js');
const jkh_f = require('./api/v1/function/jkh_function');
const jkh = require('./api/v1/function/jkh_config');
const users = require('./api/v1/user');
const admin = require('./api/v1/admin');
const ipfilter = require('express-ipfilter').IpFilter
const app = express();

var iplist = [];
const iplist_maker = (list) => {
	//file 읽어 와서 배열화 시키는 함수 로직 구성
	//기존의 iplist에 add해주는 방식!!
	const data = jkh_f.file_r(path.join(__dirname,'api/v1/function'), 'config');
	if (jkh_f.isEmpty(data)) { //null 이면
		return iplist;
	} else {
		var ip = data.split(' '); //save_data lode	
		iplist.push(ip);//save
	}
	return iplist;
}
app.use(ipfilter(iplist_maker()));//디폴트 deny //https://www.npmjs.com/package/express-ipfilter
//ip 재요청(2번째부터) 접속 차단
//app.use(mongodb.init())
app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(passport.initialize());//passport 실행
//// ip  확인 코드
app.get('/', (req, res) => {
	var rrq_ip = jkh_f.ip_denying(req);//요청을 바탕으로 분석하여 해외여부 판단
	if (rrq_ip.state == 1) {
		iplist.push(rrq_ip.ip);//차단리스트 등록
		console.log(`ip 차단 : ${rrq_ip.ip}`);//정기훈
		jkh_f.webhook('warn', `${req.ip} country '${rrq_ip.country}' api '/' enter and denying`);
		let str = rrq_ip.ip + ' ';
		jkh_f.file_a('./api/vi/function', 'config', str); //경로 파일명 인자를 파래메타로 전달 // 전달된 파라메타를 바탕으로 파일에 추가
	}
	else{
	jkh_f.webhook('success', `${req.ip} api '/' enter`);
	return res.send(str);
	}
})
/////
app.use(morgan('combined', { stream: jkh_f.logstream }))//로그파일로 관리 함 1일단위

app.use('/api/v1/user', users); //사용자
app.use('/api/v1/admin', admin); //관리자
app.listen(jkh.app.port, jkh.app.host, () => {
	let str = `http://${jkh.app.host}:${jkh.app.port}/`;//api 접근 최상위 주소
	console.log(`${jkh_f.date_time()}start server`);
	jkh_f.webhook('info', `${jkh_f.date_time()}node.js server starting!!`);
	jkh_f.webhook('info', str);

});

