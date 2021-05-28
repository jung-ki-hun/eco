var express = require("express");
var path = require('path');
var static = require('serve-static');
var session = require('express-session');
var request = require('request');
var db = require('./db.js');
//var MySQLStore = require("express-mysql-session")(session);
//var router = require(`./api/router.js`);
var expressErrorHandler = require('express-error-handler');
var argv_ip = process.argv[2];
///
var jkh_function = require('./api/function/jkh_function');

const app = express();

const dataset = {
	port: process.env.PORT,
	host: process.env.T2_HOST
}
/*
var db_info = db.getConnection();
var sessionStore = new MySQLStore(db_info);
app.use(
	session({
		key: "session_cookie_name#@",
		secret: "session_cookie_secret",
		store: sessionStore,
		resave: false,
		saveUninitialized: true,
	})
);*/
// const webhookUri = process.env.WEB_HOOK;
// option 설정
// const options = {
// 	uri: webhookUri,
// 	method: 'POST', // POST method 로 요청
// 	body: {
// 		text: 'value' // 내용
// 	},
// 	json: true // request 를 json 형태로 보내고자 한다면 true 로 꼭 설정해야한다.
// }

// // request 발송
// request.post(options, function (err, httpResponse, body) {

// })
//app.use('/', router);
app.use('/w', static(path.join(__dirname, 'web')));
var errorHandler = expressErrorHandler({
	static: {
		'404': './web/error/404.html',
		'500': './web/error/pages-500.html'
	}
})

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.listen(dataset.port, dataset.host, () => {
	//var msg = new Webhook.MessageBuilder().setText("dddd"
	//Hook.info("NODE_SERVER","Info");
	jkh_function.sendMessage('info','node.js server start !!');
	//console.log('dd');
});

