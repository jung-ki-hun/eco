const express = require('express');
const app = express();
var express = require("express");
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

app.use('/',require());
app.use('/w', static(path.join(__dirname, 'web')));//웹페이지 미들웨어
// const dataset = {
// 	port: process.env.PORT ||"80",
// 	host: process.env.T3_HOST ||"192.168.219.107" 
// }

app.listen(dataset.port, dataset.host, () => {
	console.log(`${dataset.host}:${dataset.port} server start!!!`);
});

