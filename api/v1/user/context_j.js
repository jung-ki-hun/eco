const express = require('express');
const app = express.Router();
const jkh = require("../function/jkh_function")
//const { Q, pool } = require('../../../db/psqldb');

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
    // 동훈이의 100개 보내기 테스트, 배열에 100개추가함.
    // var ress = [];
    // for (const i = 0; i < 100; i++) {
    //   ress.push({
    //     context_id: i + 1,
    //     data: "데이터값" + (i + 1) + "번",
    //     title: "제목" + (i + 1) + "번째",
    //     user: "사용자명",
    //     count: 30,
    //     date: jkh.date_ymd(),
    //     date2: jkh.date_time(),
    //   });
    // }
    return res.status(200).json(ress);
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
        
//     }

// }//리스트 함수
module.exports = (app) => {
    app.group([], (router) => {
        router.get('/test', test);//api/v1/user/context/test
        // router.get('/board/list:id', [passport.authenticate('user.local', { session: false })], index),//가져오기
        // router.post('/board/write', [passport.authenticate('user.local', { session: false })], index),// 글쓰기
        // router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
        // router.post('/comment/write', del_log)//뎃글작성
        //router.get('/test', test)//글삭제
    });
}