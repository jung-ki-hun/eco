/*****************************/
/*******초기 환경 설정*********/
/*****************************/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jkh_db_config = require('./process/login_db');
var jkh_suggest = require('./process/suggest_db');
var jkh_product = require('./process/product_db');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ express: true }));


/*****************************/
/******db 연결부 코드구현******/
/*****************************/

const db_config = require('../db.js')
const conn = db_config.init()
db_config.connect(conn)

/*****************************/
/******파일 응집화 하기******/
/*****************************/
