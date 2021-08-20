/*

var http = require("http");
var fs = require("fs");
var querystring = require("querystring");

var server = http.createServer(function (req, res) {
  req.pipe(res);
});

server.listen(4000, "127.0.0.1");

const port = 3000;

var server = http
  .createServer(function (req, res) {
    if (req.method == "GET") {
      fs.readFile("./login.html", "utf8", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      });
    } else if (req.method == "POST") {
      req.on("data", function (chunk) {
        console.log(chunk.toString());
        var data = querystring.parse(chunk.toString());
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
        res.end("이메일 : " + data.email + "비밀번호 : " + data.password);
      });
    }
  })
  .listen(port, function () {
    console.log("Server is running...");
  });

  */

  /*
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
    res.status(200).sendFile(__dirname+"/index.html");
    res.end();
});

app.listen(PORT,()=>{
    console.log(`Listening on http://127.0.0.1:${PORT}`)
})
*/

// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require('express')

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()

// Express에서 정적 파일 제공
app.use('/',express.static(__dirname));

// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("start! express server on port http://127.0.0.1:3000")
})

/*app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});*/