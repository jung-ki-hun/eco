const passport = require('passport');
const passport_local = require('passport-local');
const passport_kakao = require('passport-kakao');
const passport_naver = require('passport-naver');
const passport_jwt = require('passport-jwt');
const jkh_fun = require('./jkh_function');
const jkh_c = require('./jkh_config');
const { pool, Q } = require('../../../db/psqldb');//db 조회 용
const ExtractJWT = passport_jwt.ExtractJwt;

const JWTStrategy = passport_jwt.Strategy;
const LocalStrategy = passport_local.Strategy;
const NaverStrategy = passport_naver.Strategy;
const KakaoStrategy = passport_kakao.Strategy;


// passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
//     done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
//   });

//   passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
//     done(null, user); // 여기의 user가 req.user가 됨
//   });

const index = async (id, pw) => {
    console.log(id, pw);
    var pw_c = jkh_fun.cipheriv(pw);//암호화 진행 //iv 버전으로 수정 필수 !!!!
    console.log(id, pw_c);
    var user;
    try {
        const sql1 = Q`
          SELECT 
            u.username,
            ul.level_u,
            u.user_id
          FROM
            users u, users_level ul
          WHERE        
            ul.level_u in (select level_u from users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
            AND
            u.email = ${id}
            AND
            u.pw = ${pw_c}
          `;//암호화 한 데이터(pw)를 기반으로 검색 진행
        const query1 = await pool.query(sql1);//조회 알고리즘
        console.log(`abc ${query1.rows[0]}`);
        if (jkh_fun.isEmpty(query1.rows[0].username)) {
            console.log('login fail');
            jkh_fun.webhook('err', response.msg)//log 보내는 역활
            return null;
        }
        else {
            let user_id = query1.rows[0].user_id;//사용자 key 추출
            user = query1.rows[0];
            //res.cookie('auth', true);//쿠키생성 추후 수정예정
            const sql2 = 
            Q`insert into login_log(user_id,log_time) values (${user_id},${jkh_fun.date_time()})`;
            const query2 = await pool.query(sql2);
            if (query2.errors) {
                console.log(query2.errors);
                jkh_fun.webhook('err', 'login sql insert err(500)');
            }
        }

        return user;
    }
    catch (err) {
        console.error(err);
        jkh_fun.webhook('err', 'login sql select err(500)')//log 보내는 역활
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
                const user = await index(email, password);//login 확인 함수 
                if(jkh_fun.isEmpty(user)){ //조회값이 null 값이면
                    return done(null,{error: true, message: 'Incorrect email or password'});
                }
                           
                // JWT 토큰 생성 
                console.log(user);
                const token = jkh_fun.createToken(user.user_id);//userid 인자 전달

                return done(null, { token }, {});
                
            } catch (e) {
                // 로그인 확인 중 에러 발생 시
                console.error(e);
                return done(null, { error: true, message: 'Internal Error' }, {});
            }
        },
    ),
);
//jwtstrategy  //https://www.stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/

// passport.use(
//     'user.jwt',
//     new JWTStrategy(
//       {
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Bearer 인증 방식 사용
//         secretOrKey: config.auth.jwtSecretUser,
//       },
//       async (jwtPayload, done) => {
//         try {
//           // JWT로 사용자 인증 확인

//           // 필요시 사용자 정보 조회하는 DB 쿼리 실행

//           // 사용자 정보 조회 성공

//           return done(null, jwtPayload);
//         } catch (e) {
//           // 사용자 인증 체크 중 에러 발생 시
//           console.error(e);
//           return done(e);
//         }
//       },
//     ),
//   );
// if (config.naver.clientId && config.naver.clientSecret && config.naver.callbackUrl) {
//     // Naver Strategy
//     passport.use(new NaverStrategy(
//       {
//         clientID: config.naver.clientId,
//         clientSecret: config.naver.clientSecret,
//         callbackURL: config.naver.callbackUrl,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         const client = await pool.connect();

//         try {
//           await client.query('BEGIN');

//           console.log(JSON.stringify(profile));

//           // 토큰 값 저장
//           profile.accessToken = accessToken;
//           profile.refreshToken = refreshToken;

//           const user_id = _.get(profile, 'emails[0].value') || null; // 이메일을 ID로
//           if (!user_id) {
//             // 이메일 없을 시 연동 해제
//             const { data } = await axios.get(
//               'https://nid.naver.com/oauth2.0/token',
//               {
//                 params: {
//                   client_id: config.naver.clientId,
//                   client_secret: config.naver.clientSecret,
//                   access_token: accessToken,
//                   grant_type: 'delete',
//                   service_provider: 'NAVER',
//                 },
//               },
//             );

//             console.log(data);

//             // 로그인 에러처리
//             return done(null, {
//               error: true,
//               state: -1,
//               message: '이메일 정보가 있어야 가입가능합니다',
//             });
//           }

//           // 사용자 정보 불러오기
//           const sql = $`
//           SELECT
//             user_no,
//             state
//           FROM users
//           WHERE 1 = 1
//             AND user_social_provider = 'naver'
//             AND (user_social_info ->> 'id') = (${profile.id})::text
//           `;

//           const query = (await client.query(sql)).rows;
//           let user = null;
//           if (query.length > 0) {
//             user = query[0];
//           } else {
//             // 이메일이 가입되어 있는지 체크
//             const sql1 = $`
//             SELECT
//               user_no,
//               state
//             FROM users
//             WHERE 1 = 1
//               AND user_id = ${user_id}
//             `;

//             const query1 = (await client.query(sql1)).rows;
//             if (query1.length > 0) {
//               return done(null, {
//                 error: true,
//                 state: -2,
//                 message: '이미 사용중인 이메일입니다',
//               });
//             }

//             // 비밀번호 생성
//             const user_pw = await bcrypt.hash(`${profile.id}_${user_id}`, saltRounds);

//             // 사용자 코드 생성
//             /* let user_code = null;
//             const randomString = (length, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
//               let result = '';
//               for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
//               return result;
//             };

//             let count = 0;
//             // eslint-disable-next-line no-constant-condition
//             while (true) {
//               count += 1;
//               if (count > 100) {
//                 throw new Error('Too many user_codes');
//               }

//               user_code = randomString(8);

//               const sql1b = $`
//               SELECT
//                 user_no
//               FROM
//                 users
//               WHERE
//                 user_code = ${user_code}
//               `;

//               // eslint-disable-next-line no-await-in-loop
//               const query1b = await client.query(sql1b);
//               if (query1b.rows.length === 0) {
//                 break;
//               }
//             } */

//             // 없는 사용자면 생성
//             const sql2 = $`
//             INSERT INTO users (
//               user_id,
//               user_pw,
//               user_name,
//               user_social_provider,
//               user_social_info
//             ) VALUES (
//               ${user_id},
//               ${user_pw},
//               ${_.get(profile, 'displayName') || `사용자${user_code}`},
//               ${profile.provider},
//               ${JSON.stringify(profile)}
//             )
//             RETURNING user_no
//             `;

//             const query2 = (await client.query(sql2)).rows;
//             user = query2[0];
//             user.state = 1;
//           }

//           if (user.state === 0) {
//             // 비활성화된 사용자
//             return done(null, { error: true, state: -3, message: '비활성화된 사용자입니다' }, {});
//           }

//           if (user.state === 2) {
//             // 탈퇴 대기중
//             return done(null, { error: true, state: -4, message: '탈퇴 대기중인 사용자입니다' }, {});
//           }

//           if (user.state === 3) {
//             // 탈퇴한 사용자
//             return done(null, { error: true, state: -5, message: '탈퇴한 사용자입니다' }, {});
//           }

//           // JWT 토큰 생성
//           const token = jwt.sign({ user_no: user.user_no }, config.auth.jwtSecretUser, {
//             expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
//           });

//           await client.query('COMMIT');

//           // 로그인 체크 성공
//           return done(
//             null,
//             { user_no: user.user_no, token },
//             { error: false },
//           );
//         } catch (e) {
//           await client.query('ROLLBACK');

//           // 로그인 확인 중 에러 발생 시 
//           console.error(e);
//           return done(e);
//         } finally {
//           client.release();
//         }
//       },
//     ));
//   }

//   if (config.kakao.clientKey && config.kakao.callbackUrl) {
//     // Kakao Strategy
//     passport.use(new KakaoStrategy(
//       {
//         clientID: config.kakao.clientKey,
//         callbackURL: config.kakao.callbackUrl,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         const client = await pool.connect();

//         try {
//           await client.query('BEGIN');

//           console.log(JSON.stringify(profile));

//           // 토큰 값 저장
//           profile.accessToken = accessToken;
//           profile.refreshToken = refreshToken;

//           const user_id = _.get(profile, '_json.kakao_account.email') || null; // 이메일을 ID로
//           if (!user_id) {
//             // 이메일 없을 시 연동 해제
//             const { data } = await axios.post(
//               'https://kapi.kakao.com/v1/user/unlink',
//               {},
//               {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//               },
//             );

//             console.log(data);

//             // 로그인 에러처리
//             return done(null, {
//               error: true,
//               state: -1,
//               message: '이메일 정보가 있어야 가입가능합니다. 먼저 카카오계정을 등록해주시기 바랍니다',
//             });
//           }

//           // 사용자 정보 불러오기
//           const sql = $`
//           SELECT
//             user_no,
//             state
//           FROM 
//             users
//           WHERE
//             user_social_provider = 'kakao'
//             AND (user_social_info ->> 'id') = (${profile.id})::text
//           `;

//           const query = (await client.query(sql)).rows;
//           let user = null;
//           if (query.length > 0) {
//             user = query[0];
//           } else {
//             // 이메일이 가입되어 있는지 체크
//             const sql1 = $`
//             SELECT
//               user_no,
//               state
//             FROM users
//             WHERE
//               user_id = ${user_id}
//             `;

//             const query1 = (await client.query(sql1)).rows;
//             if (query1.length > 0) {
//               return done(null, {
//                 error: true,
//                 state: -2,
//                 message: '이미 사용중인 이메일입니다',
//               });
//             }

//             // 비밀번호 생성
//             const user_pw = await bcrypt.hash(`${profile.id}_${user_id}`, saltRounds);

//             // 사용자 코드 생성
//             /* let user_code = null;
//             const randomString = (length, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
//               let result = '';
//               for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
//               return result;
//             };

//             let count = 0;
//             // eslint-disable-next-line no-constant-condition
//             while (true) {
//               count += 1;
//               if (count > 100) {
//                 throw new Error('Too many user_codes');
//               }

//               user_code = randomString(8);

//               const sql1b = $`
//               SELECT
//                 user_no
//               FROM
//                 users
//               WHERE
//                 user_code = ${user_code}
//               `;

//               // eslint-disable-next-line no-await-in-loop
//               const query1b = await client.query(sql1b);
//               if (query1b.rows.length === 0) {
//                 break;
//               }
//             } */

//             // 없는 사용자면 생성
//             const sql2 = $`
//             INSERT INTO users (
//               user_id,
//               user_pw,
//               user_name,
//               user_gender,
//               user_social_provider,
//               user_social_info
//             ) VALUES (
//               ${user_id},
//               ${user_pw},
//               ${_.get(profile, 'displayName') || `사용자${user_code}`},
//               ${{ female: 'F', male: 'M' }[_.get(profile, '_json.kakao_account.gender')] || null},
//               ${profile.provider},
//               ${JSON.stringify(profile)}
//             )
//             RETURNING user_no
//             `;

//             const query2 = (await client.query(sql2)).rows;
//             user = query2[0];
//             user.state = 1;
//           }

//           if (user.state === 0) {
//             // 비활성화된 사용자
//             return done(null, { error: true, state: -3, message: '비활성화된 사용자입니다' }, {});
//           }

//           if (user.state === 2) {
//             // 탈퇴 대기중 사용자
//             return done(null, { error: true, state: -4, message: '탈퇴 대기중인 사용자입니다' }, {});
//           }

//           if (user.state === 3) {
//             // 탈퇴한 사용자
//             return done(null, { error: true, state: -5, message: '탈퇴한 사용자입니다' }, {});
//           }

//           // JWT 토큰 생성
//           const token = jwt.sign({ user_no: user.user_no }, config.auth.jwtSecretUser, {
//             expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
//           });

//           await client.query('COMMIT');

//           // 로그인 체크 성공
//           return done(
//             null,
//             { user_no: user.user_no, token },
//             { error: false },
//           );
//         } catch (e) {
//           await client.query('ROLLBACK');

//           // 로그인 확인 중 에러 발생 시
//           console.error(e);
//           return done(e);
//         } finally {
//           client.release();
//         }
//       },
//     ));
//   }
module.exports = passport;
