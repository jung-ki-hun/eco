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

/*
// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
// app.get('/',(req,res)=>{
//   res.sendFile(__dirname+"/index.html");
// });
var app = express();


// ejs 사용해보자
app.set("views", __dirname);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Express에서 정적 파일 제공
app.use("/", express.static(__dirname));

rows = [
  {
    no: 1,
    title: "'인제간단하죠' 사이트를 이용해 주셔서 감사합니다!",
    user: "인제간단하죠",
    date: "2021-08-01",
  },
  {
    no: 2,
    title: "질문게시판 글 작성법 및 이용 수칙",
    user: "관리자",
    date: "2021-08-01",
  },
  {
    no:3,
    title:"안녕하세요!!",
    user:"철수",
    date:"2021-08-01",
  },
  {
    no:4,
    title:"반갑습니다.",
    user:"영희",
    date:"2021-08-01",
  },
];

app.get("/boardMain", (req, res) => {
  res.render("boardMain", { rows: rows });
});

// 3000 포트로 서버 오픈
app.listen(3000, function () {
  console.log("start! express server on port http://127.0.0.1:3000");
});



*/

// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express();

// ejs 사용해보자
app.set("views", __dirname);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Express에서 정적 파일 제공
// app.get('/',(req,res)=>{
//   res.sendFile(__dirname+"/index.html");
// });
app.use("/", express.static(__dirname));

rows = [
  {
    no: 1,
    title: "'인제간단하죠' 사이트를 이용해 주셔서 감사합니다!",
    user: "인제간단하죠",
    date: "2021-08-01",
  },
  {
    no: 2,
    title: "질문게시판 글 작성법 및 이용 수칙",
    user: "관리자",
    date: "2021-08-01",
  },
  {
    no: 3,
    title: "안녕하세요!!",
    user: "철수",
    date: "2021-08-01",
  },
  {
    no: 4,
    title: "게시판 처음 써봐요!",
    user: "영희",
    date: "2021-08-01",
  },
  
  {
      no: 5,
	    title:"봉쌤 보고싶어요ㅠㅠ",
	    user: "손오공",
	    date:"2021-08-01",
	
},{
    no: 	6,
    title:	"신을 믿으십니까? 지금 바로 등록하세요.",
    user: 	"김희철",
    date:	"2021-08-01",
	
	},{
	    no: 7,
	    title:"아두이노 질문 !",
	    user: "Conviction",
	    date:"2021-08-01",
    },{
	
    no: 	8,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	
	},{
    no: 	9,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	},{
	
    no: 	10,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	
	},{
    no: 	11,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	
	},{
    no: 	12,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	
	},{
    no: 	13,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
	
	},{
    no: 	14,
    title:	"질문게시판 글 작성법 및 이용 수칙",
    user: 	"관리자",
    date:	"2021-08-01",
  },
];

app.get("/boardMain", (req, res) => {
  res.render("boardMain", { rows: rows });
});

// 3000 포트로 서버 오픈
app.listen(3000, function () {
  console.log("start! express server on port http://127.0.0.1:3000");
});

// 참고  :  https://velog.io/@hyeinisfree/Node.js-express-Session%EC%9C%BC%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// //로그인
//  app.post("/login", passport.authenticate("local"), (req, res) => {
//   console.log(req.session);
//   res.json(req.user.user_id);
// });
app.post("/login", (req, res) => {
  console.log("반갑다");
  res.sendFile(__dirname + "/404.html");
});

// // 로그아웃
// app.post("/logout", function (req, res, next) {
//   req.logout();
//   req.session.destroy(function (err) {
//     if (err) {
//       return next(err);
//     }
//     return res.send({ authenticated: req.isAuthenticated() });
//   });
// });

// // 인증 확인
// app.get("/check", (req, res, next) => {
//   if (req.isAuthenticated()) return res.json(req.user);
//   return res.json({ message: "user 없음" });
// });
