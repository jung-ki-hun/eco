const express = require('express');
const app = express.Router();
const jkh = require("../function/jkh_function")
//const { Q, pool } = require('../../../db/psqldb');
/*
const test = (req, res) => {
    var ress = {
        context_id: 1,
        data: "hi 성덕 hangul sjdjxuejd dkdkdkd this is apple",
        title: "제서어덕  ㅇㅇ",
        user: "김동훈",
        count: 30,
        date: jkh.date_ymd(),
        date2: jkh.date_time()
    }
    return res.status(200).json(ress);
<<<<<<< HEAD
}/// 테스트 함수 원본 */

const test = (req, res) => { //테스트 함수
    const x = []   
    for(let i = 0; i < 100; i++){
        var ress = {
            context_id: i + 1,
            data: "hi 성덕 hangul sjdjxuejd dkdkdkd this is apple",
            title: "제서어덕  ㅇㅇ",
            user: "김동훈",
            count: 30,
            date: jkh.date_ymd(),
            date2: jkh.date_time()
        } 
        x.push(ress);
    }
    return res.status(200).json(x);
}

const add_borad = (req, res) => {
    var parmas = {  //모든 파일에서 중요함 => req에서 받아서 사용
        ...req.body,
        ...req.parmas,
        ...req.query,
    }
}
const index = (req, res) => {
    var parmas = {
        ...req.body,
        ...req.parmas,
        ...req.query,
    }
    if (isEmpty(
        params.ur_sample,
        params.ur_price,
        params.ur_hairs,
        params.payment_type,
        params.ur_gender,
    )) {
=======
}/// 테스트 함수
// const add_borad = (req, res) => {
//     var parmas = {
//         ...req.body,
//         ...req.parmas,
//         ...req.query,
//     }
// }
// const index = (req, res) => {
//     var parmas = {
//         ...req.body,
//         ...req.parmas,
//         ...req.query,
//     }
//     if (isEmpty(
//         params.ur_sample,
//         params.ur_price,
//         params.ur_hairs,
//         params.payment_type,
//         params.ur_gender,
//     )) {
>>>>>>> 650b95132cd8600903ed4f77d78ec9382f34eb0f
        
//     }

// }
module.exports = (app) => {
    app.group([], (router) => {
        router.get('/test', test);//api/v1/user/context/test
        // router.get('/board/list:id', [passport.authenticate('user.local', { session: false })], index),//가져오기
        //     router.post('/board/write', [passport.authenticate('user.local', { session: false })], index),// 글쓰기
        //     router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
        //     router.post('/comment/write', del_log)//뎃글작성
        //router.get('/test', test)//글삭제
    });
}
/*
const test =  (req,res)=>{
    var ress = {
        context_id : 1,
        data:"hi 성덕 hangul sjdjxuejd dkdkdkd this is apple",
        title : "제서어덕  ㅇㅇ",
        user : "김동훈",
        count : 30,
        date : jkh.date_ymd(),
        date2 : jkh.date_time()
    }
    return res.status(200).json(ress);
}///xpx
const index = (req,res) =>{
    var parmas ={
        ...req.body,
        ...req.parmas,
        ...req.query
    }
    var 
}
module.exports = (app) => {
      app.get('/test',test);//api/v1/user/context/test
      
  }*/