const router = require('express').Router();
/*****************************/
/******최상위 환경 페이지******/
/*****************************/
router.post('/login',(req,res)=>{
    jkh_db_config.userSelect_post(req, res, conn); //유저 정보를 찾고
})

//권한을 구분 유저/관리자
router.get('/login' ,(req, res) => {
    
})


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
//유저 권한 어드민 권한 구분 -> 쿠키사용 예정