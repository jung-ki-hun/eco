//admin context_q.js
// const express = require('express'); // const app = express.Router();
// const nosqldb = require('../../../db/nosql_function');
// const app = express.Router();
// const jkh = require("../function/jkh_function")
// //const { Q, pool } = require('../../../db/psqldb');

// const test = (req, res) => { //테스트 함수
//     const x = []   
//     for(let i = 0; i < 100; i++){
//         var ress = {
//             context_id: i + 1,
//             data: "hi 성덕 hangul sjdjxuejd dkdkdkd this is apple",
//             title: "제서어덕  ㅇㅇ",
//             user: "김동훈",
//             count: 30,
//             date: jkh.date_ymd(),
//             date2: jkh.date_time()
//         } 
//         x.push(ress);
//     }
//     return res.status(200).json(x);
// }

// const add_borad =  async (req, res) => {
//     const response = {
//         state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
//         query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
//         msg: 'Successful',
//     };
//     var params = { //모든 파일에서 중요함 => req에서 받아서 사용
//         ...req.body,
//         ...req.params,
//         ...req.query,
//     }
//     if (isEmpty(
//         params.name,
//         params.id,        
//         params.title,
//         params.content,
//     )) {
//         response.state = 2;
//         response.msg = 'params is empty';
//         jkh.webhook('err', 'params is empty');
//         return res.status(400).json(response)
//     }
//     else {
//         let data = {
//             name : params.name,   // -> 닉네임
//             id : params.id,
//             create_d : jkh.date_time(),    //서버 시간으로 저장
//             title : params.title,
//             content : params.content,
//         }
//         await nosqldb.qna.addboard(data);
//         response.state = 1;
//         response.msg = 'Successful';
//         return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
//     }

// }

// module.exports = (app) => {
//     app.group([], (router) => {
//         router.get('/test', test);//api/v1/user/context/test
//         // router.get('/board/list:id', [passport.authenticate('user.local', { session: false })], index),//가져오기
//         // router.post('/board/write', [passport.authenticate('user.local', { session: false })], add_borad),// 글쓰기
//         // router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
//         // router.post('/comment/write', del_log)//뎃글작성
//         //router.post('/test', test)//글삭제
//     });
// }
const express = require('express');
//const nosqldb = require('../../../db/nosql_function');
const app = express.Router();
const jkh = require("../function/jkh_function")
const any = require("any-function");
const passport  = require('../function/jkh_passportU');
const { Q, pool } = require('../../../db/psqldb');

const test = (req, res) => {
    var ress = [];
    for (let i = 0; i < 100; i++) {
        ress.push({
            context_id: i + 1,
            data: "데이터값" + (i + 1) + "번",
            title: "제목" + (i + 1) + "번째",
            user: "사용자명",
            count: 30,
            date: jkh.date_ymd(),
            date2: jkh.date_time(),
        });
    }

    return res.status(200).json(ress);
}/// 테스트 함수

const add_borad = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var params = {
        ...req.body,
        ...req.params,
        ...req.query,

    }
    if (any.isEmpty(
        params.name,
        params.id,
        params.title,
        params.content,
        params.image
    )) {
        response.state = 2;
        response.msg = 'params is empty';
        jkh.webhook('err', 'params is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            name: params.name,   // -> 닉네임
            id: params.id,
            create_d: jkh.date_time(),    //서버 시간으로 저장
            title: params.title,
            content: params.content,
            image:params.image
        }
        let sql = 
        Q`insert 
        into noticeq(title,content,createtime,viewcount,comments,imagefilename,editer) 
        values(${data.title},${data.content},${data.create_d},1,0,${data.image},${editer});
        `;
        const query1 = await pool.query(sql);//조회 알고리즘
        //nosqldb.qna.addboard(data);
        response.state = 1;
        response.msg = 'Successful';
        return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
    }

}
const add_commend = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var params = {
        ...req.body,
        ...req.params,
        ...req.query,
    }
    if (any.isEmpty(
        params.name,
        params.id,
        params.title,
        params.content,
        params.noq_id
    )) {
        response.state = 2;
        response.msg = 'params is empty';
        jkh.webhook('err', 'params is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            name: params.name,   // -> 닉네임
            id: params.id,
            create_d: jkh.date_time(),    //서버 시간으로 저장
            title: params.title,
            content: params.content,
            noq_id: params.noq_id
        }
        let sql1 = 
        Q`select * from commandq where noq_id = ${data.noq_id}`;//해당하는 보드의 값
        const query1 = await pool.query(sql1);//조회 알고리즘

        let sql2 = Q`insert into commandq(c_editer,noq_id,createtime,content) 
        values(${data.name},${data.noq_id},${data.create_d},${data.create_d})`;        
        const query2 = await pool.query(sql2);//추가 알고리즘
        
        let sql3 = Q`update noticeq
        set comments = ${query1.row[0].comments +1}
        where
        noq_id = ${data.noq_id}
        `;
        const query3 = await pool.query(sql3);//수정 알고리즘

        //nosqldb.qna.addboard(data);
        response.state = 1;
        response.msg = 'Successful';
        return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
    }

}
const index = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var params = {
        ...req.body,
        ...req.params,
        ...req.query,
    }
    if (any.isEmpty(arams.selector)) {
        response.state = 2;
        response.msg = 'params is empty';
        jkh.webhook('err', 'params is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            selector: params.selector
        }
        let sql = Q`
        select * 
        from 
            noticeq n
        where
            n.noq_id between ${data.selector -100} and ${data.selector}`;
        const query1 = await pool.query(sql);
        //nosqldb.qna.addboard(data);
        response.state = 1;
        response.msg = 'Successful';
        return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
    }
}//가져오기
const find_list_context = async (req,res)=>{
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var params = {
        ...req.body,
        ...req.params,
        ...req.query,
    }
    if (any.isEmpty(params.selector)) {
        response.state = 2;
        response.msg = 'params is empty';
        jkh.webhook('err', 'params is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            selector: params.selector,
            name: params.name
        }

        let sql = Q`
        select * 
        from 
            noticeq n
        where
            n.title like %${data.name}%
            and
            n.noq_id between ${data.selector -100} and ${data.selector}`;
        const query1 = await pool.query(sql);
        
//nosqldb.qna.addboard(data);
        response.state = 1;
        response.msg = 'Successful';
        response.query = query1;
        return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
    }
}
const delete_context = async (req, res)=>{
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    var params = {
        ...req.body,
        ...req.params,
        ...req.query,
    }
    if (any.isEmpty(params.no)) {
        response.state = 2;
        response.msg = 'params is empty';
        jkh.webhook('err', 'params is empty');
        return res.status(400).json(response)
    }
    else {
        let data = {
            no: params.no
        }
        let sql = Q`delete from noticeq nq where nq = ${data.no}`;
        const query1 = await pool.query(sql);
        response.state = 1;
        response.msg = 'Successful';
        return res.status(200).json(response); //클라이언트에게 완료 메시지 보내줌
    }
}
module.exports = (app) => {
    app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
        router.get('/test', test);//api/v1/user/context/test
        router.get('/board/list:id', index),//가져오기
        router.post('/board/write', add_borad),// 글쓰기
        router.get('/board/:id', index),//게시판 뷰//추후 필요시 작성
        router.post('/comment/write', add_commend),//뎃글작성
        router.get('/board/find',find_list_context)//게시글 검색 기능 해당리스트
        router.put('/board/delete', delete_context)//글삭제
        // router.get('/board/list:id', [passport.authenticate('user.local', { session: false })], index),//가져오기
        // router.post('/board/write', [passport.authenticate('user.local', { session: false })], add_borad),// 글쓰기
        // router.get('/board/:id', [passport.authenticate('user.local', { session: false })], index),//게시판 글찿기
        // router.post('/comment/write', del_log)//뎃글작성
    });
}
