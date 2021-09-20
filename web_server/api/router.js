const router = require('express').Router();
const jkh_f = require('./lib/jkh_wfuncfion');
/*****************************/
/******최상위 환경 페이지******/
/*****************************/
router.post('/login',(req,res)=>{
    //jkh_db_config.userSelect_post(req, res, conn); //유저 정보를 찾고

})

//권한을 구분 유저/관리자
router.get('/login' ,(req, res) => {
    
})
router.get('/level',(req, res)=>{
if()//
{

}
else{

}
})//레벨에따라 보여주는 페이지가 달라짐!!


//'//web/landing/industry/index.html' 일때 로그인의 유무를 판단하는 기능 구현
//router
// '/' get 요청 작성 금지
//메인페이지로 이동

/*****************************/
/******최상위 환경 페이지******/
/*****************************/
module.exports = router;

//유저 페이지 어드민 페이지 나누기
//유저 권한 어드민 권한 구분 -> 쿠키사용 예정