const express = require("express");
const path = require('path');
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
require('./api/v1/function/jkh_group.js');
const jkh_function = require('./api/v1/function/jkh_function');
const jkh = require('./api/v1/function/jkh_config');
const users = require('./api/v1/user');
const admin = require('./api/v1/admin');
const app = express();


app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(passport.initialize());

app.use(morgan('combined', { stream: jkh_function.logstream }))//로그파일로 관리 함

app.get('/', (req, res) => {
	const str = '제성덕 여기가 진입점인데 바봉';
	return res.send(str);
})
app.use('/api/v1/user/', users); //사용자
app.use('/api/v1/admin', admin); //관리자
app.listen(jkh.config.app.port, jkh.config.app.host, () => {
	let str = `http://${jkh.config.app.host}:${jkh.config.app.port}/`
	console.log('start server');
	jkh_function.webhook('info', `${jkh_function.date_time()}node.js server starting!!`);
	jkh_function.webhook('info', str);

});

