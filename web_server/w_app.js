const express = require('express');
const app = express();
var expressErrorHandler = require('express-error-handler');
var jkh_function = require('./api/lib/jkh_wfuncfion');
var jkh = require('./api/lib/jkh_wconfig')//jkh_wconfig에서 config를 호출하기위한 변수
var path = require('path');
var static = require('serve-static');
var morgan = require("morgan");
app.use(morgan('combined',{stream: jkh_function.logstream}))//로그파일로 관리 함
app.use('/',require('./api/router.js'));
app.use('/w', static(path.join(__dirname, 'web')));//웹페이지 미들웨어
/*const dataset = {
	port: process.env.T2_PORT ||"80",
	host: process.env.T3_HOST ||"192.168.219.107" 
}*/
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
	console.log(jkh_function.appRoot);
	jkh_function.webhook('info',`open web server`);
	jkh_function.webhook('info',`http://${jkh.config.app.host}:${jkh.config.app.port}/`);

});

