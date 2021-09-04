const express = require('express');
const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');

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
}///xpx
const index = (req, res) => {
    var parmas = {
        ...req.body,
        ...req.parmas,
        ...req.query
    }
    var
}
module.exports = (app) => {
    app.group([], (router) => {
        router.get('/test', test);//api/v1/user/context/test
        router.get('/write', [passport.authenticate('user.local', { session: false })], index),//글작성
        router.post('/board/write', [passport.authenticate('user.local', { session: false })], index),//
        router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
        router.post('/comment/write', del_log),//뎃글작성
        //router.get('/test', test)//글삭제
    });
}