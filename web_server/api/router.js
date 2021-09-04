const router = require('express').Router();
/*****************************/
/******최상위 환경 페이지******/
/*****************************/
router.post('/login',(req,res)=>{
    jkh_db_config.userSelect_post(req, res, conn); //유저 정보를 찾고
})
/*
//권한을 구분 유저/관리자
router.get('/login', (req, res) => {
    
})
*/
//로그인 - 세션등록
router.get('/login', (req, res) => {
    try{
    var req_data = {
        name: req.session.user.name,
        email: req.session.user.email,
        pw: req.session.user.password
    }}
    catch(e){
       
    }
    jkh_db_config.userSelect_get(req, res, conn, req_data);
})//로그인 - 닉네임 추출

router.post('/logout', (req, res) => {
    jkh_db_config.userdisable(req, res, conn);
})//로그아웃

router.post('/regi', (req, res) => {

    var req_data = {
        email: req.body.email,
        pw: req.body.password,
        name: req.body.username,
    }
    jkh_db_config.userCreate(req, res, conn, req_data);
});//회원 가입

router.post('/repw', (req, res) => {
    var email = req.body.email;
    jkh_db_config.userchage(req, res, conn, email);
});//비밀번호 찾기

//'//web/landing/industry/index.html' 일때 로그인의 유무를 판단하는 기능 구현
router.get('/', (req, res) => {
    req.session;
    
    res.redirect(302, '/w/user/index.html');
});
//메인페이지로 이동

/*****************************/
/******최상위 환경 페이지******/
/*****************************/
module.exports = router;

//유저 페이지 어드민 페이지 나누기
//유저 권한 어드민 권한 구분