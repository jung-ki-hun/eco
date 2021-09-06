// const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');

//user admin 동기화
 const regiser = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2: 변수없음, 3: 조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    const params = {
        ...req.query,
        ...req.params,
        ...req.body,
        id: req.uesr.email,
        pw: req.user.password,
        name: req.user.username
    }
    try {
        if (jkh.isEmpty(params.id, params.pw, params.name)) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.state(404).json(response);
        }
        const sql1 = Q`
        insert into user(username,email,pw) values (${params.name},${params.id},${jkh.cipher(params.pw)})
        `;//
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (jkh.isEmpty(query1.rows)) {
            response.state = 3;
            response.msg = 'login failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
            return res.state(404).send(json(response));
        }
        else {
            response.state = 1;
            response.msg = 'Member registration successful';
            return res.state(200).join(response);//데이터 전송 !!
        }

    }
    catch (err) {
        jkh.webhook.sendMessage('err', 'login sql select err(500)')//log 보내는 역활
    }
    return res.state(200).join(response);//데이터 전송 !!

}//다시 만들기
const get_name = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    const params = {
        ...req.query,
        ...req.params,
        ...req.body,
        id: req.uesr.email,
        pw: req.user.password,
        name: req.user.username
    }
    try {
        if (jkh.isEmpty(params.id, params.pw, params.name)) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.state(404).json(response);
        }
        const sql1 = Q`
        insert into user(username,email,pw) values (${params.name},${params.id},${jkh.cipher(params.pw)})
        `;//
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (jkh.isEmpty(query1.rows)) {
            response.state = 3;
            response.msg = 'login failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
            return res.state(404).send(json(response));
        }
        else {
            response.state = 1;
            response.msg = 'Member registration successful';
            return res.state(200).join(response);//데이터 전송 !!
        }

    }
    catch (err) {
        jkh.webhook.sendMessage('err', 'login sql select err(500)')//log 보내는 역활
    }
    return res.state(200).join(response);//데이터 전송 !!
}//안드로이드에서 사용할듯? 추후 수정 하기
 const find_pw = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    const params = {
        ...req.query,
        ...req.params,
        ...req.body,
        id: req.uesr.email,
        pw: req.user.password,        
        name: req.user.username
    }
    try {
        if (jkh.isEmpty(params.id, params.pw, params.name)) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.state(404).json(response);
        }
        const sql1 = Q`
            UPDATE 
            user 
            set pw = ${jkh.cipher(params.pw)} 
            WHERE 
            username = ${params.name} 
            AND 
            email = ${params.id}
            `;//
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (query1.err) {
            response.state = 3;
            response.msg = 'login failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
            return res.state(404).send(json(response));
        }
        else {
            response.state = 1;
            response.msg = 'password change successful';
            return res.state(200).join(response);//데이터 전송 !!
        }//성공시
    } catch (err) {
        jkh.webhook.sendMessage('err', 'select err(500)')//log 보내는 역활
    }
    return res.state(200).join(response);//데이터 전송 !!
}

const test = (req, res)=>{//테스트 함수
    /*const query1 = await pool.query(sql1);//조회 알고리즘
      if (jkh.isEmpty(query1.rows)) {
        response.state = 2;
        response.msg = 'login failed';
        return res.state(404).send(json(response)), res.send("로그인 실패");
      }
      else{
        const user_id = query1.rows[0].user_id;//사용자 key 추출
        session.user = {
          name: response.query,//results[0].user_name;//results[0];
          password: req_data.pw,
          email: req_data.email
        }//새션생성
        res.cookie('auth',true);//쿠키생성 추후 수정예정
        response.state = 1; 
        response.msg = 'login Success';
        return res.state(200).send(json(response)), 
      }*/
      return res.send("로그인 성공");
  }

module.exports = (app) => {
    app.group([], (router) => {
        router.get('/login_n', get_name),//사용자 닉네임 요청
        router.post('/regiser', regiser)//회원가입
        router.post('/pwfind', find_pw)//비밀번호 찾기
        router.get('/test',test)//테스트
    });
}