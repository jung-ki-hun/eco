const passport = require('passport');
const passport_local = require('passport-local');
const jkh_fun = require('./jkh_function');
const jkh_config = require('./jkh_config');
const sql = require('../../../db/sqldb');

// Local Strategy
passport.use(
    // 'user.local',
    // new LocalStrategy(
    //   {
    //     usernameField: 'user_id',
    //     passwordField: 'user_pw',
    //     session: false, // 세션 사용안함
    //   },
    //   async (user_id, user_pw, done) => {
    //     const client = await pool.connect();
    //     try {
    //       await client.query('BEGIN');
    //       // user_id, user_pw로 사용자 인증 확인. 해당 값이 없으면 400 리턴
    //       const sql = $`
    //       SELECT
    //         user_no,
    //         user_pw,
    //         state
    //       FROM users
    //       WHERE 1 = 1
    //         AND user_id = ${user_id}
    //       `;
  
    //       const query = (await client.query(sql)).rows;
    //       if (query.length === 0) {
    //         // 없는 사용자
    //         return done(null, { error: true, state: -1, message: 'User not found' }, {});
    //       }
    //       const user = query[0];
  
    //       const check = await bcrypt.compare(user_pw, user.user_pw);
    //       if (!check) {
    //         // 비밀번호 틀림
    //         return done(null, { error: true, state: -2, message: 'Incorrect email or password' }, {});
    //       }
  
    //       if (user.state === 0) {
    //         // 비활성화된 사용자
    //         return done(null, { error: true, state: -3, message: 'Disabled user' }, {});
    //       }
  
    //       if (user.state === 2) {
    //         // 탈퇴 대기중
    //         return done(null, { error: true, state: -4, message: 'Waiting Left' }, {});
    //       }
  
    //       if (user.state === 3) {
    //         // 탈퇴한 사용자
    //         return done(null, { error: true, state: -5, message: 'Left user' }, {});
    //       }
  
    //       const sql2 = $`
    //       SELECT
    //         stl_no
    //       FROM
    //         stylists
    //       WHERE
    //         stl_no = ${user.user_no}
    //       `;
    //       const query2 = (await client.query(sql2)).rows;
    //       console.log(query2.length > 0 ? 'stl' : 'cstm')
  
    //       // JWT 토큰 생성
    //       const token = jwt.sign({ user_no: user.user_no, user_type: query2.length > 0 ? 'stl' : 'cstm' }, config.auth.jwtSecretUser, {
    //         expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
    //       });
  
    //       await client.query('COMMIT');
    //       // 로그인 체크 성공
    //       return done(null, { token }, {});
    //     } catch (e) {
    //       await client.query('ROLLBACK');
    //       // 로그인 확인 중 에러 발생 시
    //       console.error(e);
    //       return done(null, { error: true, state: 0, message: 'Internal Error' }, {});
    //     } finally {
    //       client.release();
    //     }
    //   },
    // ),
  );
  