// const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');
const passport = require('../function/jkh_passport');

 const index = async (req, res) => {
  // 에러처리
  if (req.user.error) {
    return res.status(500).json(req.user);
  }

  // 로그인 성공 시
  const { token } = req.user;
res.send(`token :   ${token}`);
  return res.json({ token });
}//login 
const del_log = async (req,res) =>{
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
    pw: req.user.password
  }
  var session = req.session; //새선 만듬
  var pw_c = jkh.cipher(params.pw);
    try {
    const sql1 = Q`
        SELECT 
          u.username,
          ul.level_u
        FORM
          users u, users_level ul
        WHERE        
          ul.level_u in (select level_u form users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
          AND
          u.email = ${params.id}
          AND
          u.pw = ${params.pw}
        `;//
    const query1 = await pool.query(sql1);//조회 알고리즘
    if (jkh.isEmpty(query1.rows)) {
      response.state = 3;
      response.msg = 'login failed';
      jkh.webhook('err', response.msg)//log 보내는 역활
      return res.state(404).send(json(response));
    }
    else {
      const user_id = query1.rows[0].user_id;//사용자 key 추출
      session.user = {
        name: response.query,//results[0].user_name;//results[0];
        password: req_data.pw,
        email: req_data.email
      }//새션생성
      res.cookie('auth',true);//쿠키생성 추후 수정예정
      response.state = 1; 
      response.msg = 'login Success';
      jkh.webhook('Success', response.msg)//log 보내는 역활 -> 디스코드
    }
  }
  catch (err) {
    console.error(err);
    jkh.webhook.sendMessage('err','login sql select err(500)')//log 보내는 역활
  }
  return res.state(200).join(response);//데이터 전송 !!
}
const test = (req,res)=>{
  return res.send("aoifhjaslj");
}
module.exports = (app) => {
  app.group([],(router)=>{
    router.post('/in',[passport.authenticate('user.local', { session: false })],index),//로그인
    router.post('/in/naver',[passport.authenticate('user.naver', { session: false })],index),//로그인
    router.post('/in/kakao',[passport.authenticate('user.kakao', { session: false })],index),//로그인
    router.post('/out',del_log),//로그아웃
    router.get('/test',test)//테스트
    });
}
