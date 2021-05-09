var express = require("express");
var path = require('path');
var static = require('serve-static');
var session = require('express-session');
var db = require('./db.js');
var MySQLStore = require("express-mysql-session")(session);
var router = require(`./api/router.js`);
var expressErrorHandler = require('express-error-handler');
var argv_ip = process.argv[2];
const app = express();
const dataset = {
	port: process.env.PORT,
	host: argv_ip != null ? argv_ip.toString() : '127.0.0.1'
}
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
);
app.use('/', router);
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
	var str = `익스프레스로 웹 서버를 실행함 : ${dataset.host} : ${dataset.port}`;
	console.log(str);
	console.log(__dirname);
	console.log(argv_ip);
	console.log(db_info);	
});

 