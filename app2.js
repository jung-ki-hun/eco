var express = require("express");
//var path = require('path');
//var static = require('serve-static');
var session = require('express-session');
//var request = require('request');
//var db = require('./db/db.js');
var expressErrorHandler = require('express-error-handler');
var argv_ip = process.argv[2];
///
var jkh_function = require('./api/v1/function/jkh_function');

const app = express();

const dataset = {
	port: process.env.PORT ||"3000",
	host: process.env.T3_HOST ||"192.168.219.101" 
}
const response ={
    test : "name", 
    status : 1,
    mag : 'nice connet'
}
app.get('/login', (req, res, next)=>{
    return res.status(200).json(JSON.stringify(response));//res.send('11111asnlsdakjalsjsdalsd')//
    next();
})
app.listen(dataset.port, dataset.host, () => {
	//var msg = new Webhook.MessageBuilder().setText("dddd"
	//Hook.info("NODE_SERVER","Info");
	//jkh_function.sendMessage('info','node.js server start !!');
	console.log(`${dataset.host}:${dataset.port} server start!!!`);
});

