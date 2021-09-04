const passport = require('passport');
const passport_local = require('passport-local');
const passport_kakao = require('passport-kakao');
const passport_naver = require('passport-naver');
const passport_jwt = require('passport-jwt');
const jkh_fun = require('./jkh_function');
const jkh_c = require('./jkh_config');
const pgsql = require('../../../db/psqldb');//db 조회 용
const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passport_jwt.Strategy;
const LocalStrategy = passport_local.Strategy;
const NaverStrategy = passport_naver.Strategy;
const KakaoStrategy = passport_kakao.Strategy;

const index = async (id, pw) => {
    var pw_c = jkh.cipher(pw);
    try {
        const sql1 = Q`
          SELECT 
            u.username,
            ul.level_u
          FROM
            users u, users_level ul
          WHERE        
            ul.level_u in (select level_u form users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
            AND
            u.email = ${id}
            AND
            u.pw = ${pw_c}
          `;//
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (jkh.isEmpty(query1.rows)) {
            response.state = 2;
            response.msg = 'login failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
        }
        else {
            const user_id = query1.rows[0].user_id;//사용자 key 추출
            //res.cookie('auth', true);//쿠키생성 추후 수정예정
        }
        const sql2 = Q`
          insert into login_log(user_id,log_time) values (${user_id},${jkh.date_time()})
          `;
        const query2 = await pool.query(sql2);
        if (query2.errors){
            console.log(query2.errors);
            jkh.webhook.sendMessage('err', 'login sql insert err(500)');
        }
        return user;
    }
    catch (err) {
        console.error(err);
        jkh.webhook.sendMessage('err', 'login sql select err(500)')//log 보내는 역활
    }
}//login 

// Local Strategy
passport.use(
    'user.local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false, // 세션 사용안함
            passReqToCallback: false,//req 사용관련 함수
        },
        async (email, password, done) => {
            try {
                //로그인 확인 구현 자리
                //index(email, password);//login 확인 함수
                const user  = index(email, password);//login 확인 함수   
                // JWT 토큰 생성 
                const token = jkh_fun.createToken();//userid 인자 전달

                //로그인 처리관련 콜백 함수 제작 자리 //추후 개발예정                 
                //   const token = jwt.sign({ user_no: user.user_no, user_type: query2.length > 0 ? 'stl' : 'cstm' }, config.auth.jwtSecretUser, {
                //     expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
                //   });

                // 로그인 체크 성공
                return done(null, { token }, {});
            } catch (e) {
                // 로그인 확인 중 에러 발생 시
                console.error(e);
                return done(null, { error: true, state: 0, message: 'Internal Error' }, {});
            }
        },
    ),  
);
module.exports = passport;
