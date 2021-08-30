const router = require('express').Router();
/*****************************/
/******최상위 환경 페이지******/
/*****************************/
router.post('/',(req,res)=>{

})


//'//web/landing/industry/index.html' 일때 로그인의 유무를 판단하는 기능 구현
router.get('/', (req, res) => {
    req.session;
    
    res.redirect(302, '/web/index.html');
});
//메인페이지로 이동

/*****************************/
/******최상위 환경 페이지******/
/*****************************/
module.exports = router;