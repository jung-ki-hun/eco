const express = require("express");
const path = require('path');
const morgan = require("morgan");
const passport = require('passport');
const cookieParser = require('cookie-parser'); //쿠키제공
const cors = require('cors');
require('./api/v1/function/jkh_group.js');
const jkh_function = require('./api/v1/function/jkh_function');
const jkh = require('./api/v1/function/jkh_config');
const users = require('./api/v1/user');
const admin = require('./api/v1/admin');
const app = express();
//해야될것
/*
- cors 설정 확인
- 쿠키 사용할때 생각좀 잘해보기
*/
//코드 스타일 -> commonjs
app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(passport.initialize());//passport 실행

app.use(morgan('combined', { stream: jkh_function.logstream }))//로그파일로 관리 함 1일단위

app.get('/', (req, res) => {
	const str = 'api server gate';
	jkh_function.webhook('success',`${req.ip} api '/' enter`);
	return res.send(str);
})
app.use('/api/v1/user/', users); //사용자
app.use('/api/v1/admin', admin); //관리자
app.listen(jkh.app.port, jkh.app.host, () => {
	let str = `http://${jkh.app.host}:${jkh.app.port}/`;//api 접근 최상위 주소
	console.log(`${jkh_function.date_time()}start server`);
	jkh_function.webhook('info', `${jkh_function.date_time()}node.js server starting!!`);
	jkh_function.webhook('info', str);

});

