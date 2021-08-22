const passport = require('passport');
const passport_local = require('passport-local');
const jkh_fun = require('./jkh_function');
const jkh_config = require('./jkh_config');
const sql = require('../../../db/sqldb');

// Local Strategy
passport.use(
    'user.local',
    new LocalStrategy(
        {
            usernameField: 'user_id',
            passwordField: 'user_pw',
            session: false, // 세션 사용안함
        },
        async (user_id, user_pw, done) => {
            try {
                //로그인 확인 구현 자리

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
            } finally {
                client.release();
            }
        },
    ),
    // async (username, password, cb) => {
    //     User.findOne({username: username})
    //         .then((user) => {
    //             if (!user) {
    //                 return cb(null, false)
    //             }

    //             // 위에서 만들어준 함수
    //             const isValid =jkh_fun.createToken// validPassword(password, user.hash, user.salt);

    //             if (isValid) {
    //                 return cb(null, user);
    //             } else {
    //                 return cb(null, false);
    //             }

    //         })
    //         .catch((err) => {
    //             cb(err);
    //         });
    // }
);
module.exports = passport;
