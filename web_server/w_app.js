const express = require('express');
const app = express();
var expressErrorHandler = require('express-error-handler');
//var argv_ip = process.argv[2]; //test debug
//var jkh_function = require('./api/v1/function/jkh_function');
var path = require('path');
var static = require('serve-static');
var morgan = require("morgan");
//-------------------------------//
//-------------------------------//
//-------------------------------//

//app.use(morgan('dev',{stream: jkh_function.logstream}))//로그파일로 관리 함
app.use('/',require('./api/router.js'));
app.use('/w', static(path.join(__dirname, 'web')));//웹페이지 미들웨어
const dataset = {
	port: process.env.T2_PORT ||"80",
	host: process.env.T3_HOST ||"192.168.219.107" 
}
var errorHandler = expressErrorHandler({
	static: {
		'404': './web/error/404.html',
		'500': './web/error/pages-500.html'
	}
})//안드로이드에서도 최적화 진행예정

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.listen(dataset.port, dataset.host, () => {
	console.log(`${dataset.host}:${dataset.port} server start!!!`);
});

