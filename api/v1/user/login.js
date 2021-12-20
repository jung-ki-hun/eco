// const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');
const passport = require('../function/jkh_passportU');

 const index = async (req, res) => {
  //쿠키에 담아줘야될것
   // 닉네임
   // id
   // jwt
  // 에러처리
  const { token } = req.user; //req.user은 passport가 보내
  const cookie_d = {
    id : req.user.id,
    jwt : token.token,
    name : req.user.name,
    level : token.level
  }//쿠키에 저장
  if (req.user.error) {
    return res.status(500).json(req.user);
  }
  // 로그인 성공 시
  res.cookie('key',cookie_d);
  //res.send(`token :   ${token}`); //토근 보내주는 구간
  return res.json({ token });
}//login 
const index_kakao = async (req, res) => {
  if (req.user.error) {
    // 로그인 실패 시
    // return res.redirect(
    //   `${config.app.webUrl}/#/social-redirect/kakao?success=false&message=${encodeURIComponent(
    //     req.user.message,
    //   )}`,
    //);
  } 

  // 로그인 성공 시
  const { token } = req.user;
  return res.redirect(
    // `${config.app.webUrl}/#/social-redirect/kakao?success=true&token=${encodeURIComponent(
    //   Buffer.from(token).toString('base64'),
    // )}`, //성공시 보내주는 콜백 url + 다른거 조합해 보내준다 이거 완성해보기
  );
} //v2 기능

const del_log = async (req,res) =>{
  const response = {
    state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
    query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
    msg: 'Successful',
  };
  res.clearCookie('key');//수정필요
  return res.state(200).join(response);//데이터 전송 !!
}

const test = (req,res)=>{
  //req!!!
  const u = req.body.id;
  return res.join(u);
}
module.exports = (app) => {
  app.group([],(router)=>{
    router.get('/in',[passport.authenticate('user.local', { session: false })],index),//로그인
    
    router.get('/in/naver',[passport.authenticate('user.naver', { session: false })]),//로그인
    router.get('/in/naver/callbake',[passport.authenticate('user.naver', { session: false })])//로그인 요청결과에 대한 응답처리

    router.get('/in/kakao',[passport.authenticate('user.kakao', { session: false })]),//로그인 요청
    router.get('/in/kakao/callbake',[passport.authenticate('user.kakao', { session: false })],index_kakao ),//로그인 요청결과에대한 응답처리
    router.get('/out/kakao'),//카카오 로그아웃

    router.get('/out',del_log),//로그아웃  // 미구현
    router.get('/test',test)//테스트
    });
}
