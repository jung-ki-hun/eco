// const pi = 3.14;
// const r = 1.4;
// const h = 1.5;
// console.log(pi*r*r*h);

 const { pool, Q } = require('../../db/psqldb');
 const jkh_fun = require('../v1/function/jkh_function');
// const dbtest = async () => {
//     let id = '1@1',pw ='T1UTH4GycT4fS/zRUGddGQ=='
//     try {
//         const ad =  '1@1';
//         const sql1 = Q`
//         SELECT 
//         u.username,
//         ul.level_u,
//         u.user_id
//       FROM
//         users u, users_level ul
//       WHERE        
//         ul.level_u in (select level_u from users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
//         AND
//         u.email = ${id}
//         AND
//         u.pw = ${pw}      
//             `;//
//         console.log(sql1);
//         const query1 = await pool.query(sql1);//조회 알고리즘
//         if (jkh.isEmpty(query1.rows)) {
//             jkh.webhook('err', response.msg)//log 보내는 역활
//             return 'empty';
//         }
//         else {
//             const s = query1.rows[0];
//             console.log(s);
//             console.log('ddd',s.username);
//             return s;
//         }
//     }
//     catch (e) {
//         //console.error(e.message);
//         console.log(e);
//     }
// }
// console.log(dbtest())
//console.log(jkh.cipheriv(`1234`));//테스트해보기

// const a = { 
//     a1:1,
//     a2:2
// }
// const b = {
//     ...a,
//     bb:5
// }
// console.log(b.a1);

// const index = async (id, pw) => {
//     console.log(id, pw);
//     var pw_c = jkh_fun.cipheriv(pw);//암호화 진행 //iv 버전으로 수정 필수 !!!!
//     console.log(id, pw_c);
//     var user;
//     try {
//         const sql1 = Q`
//           SELECT 
//             u.username,
//             ul.level_u,
//             u.user_id
//           FROM
//             users u, users_level ul
//           WHERE        
//             ul.level_u in (select level_u from users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
//             AND
//             u.email = ${id}
//             AND
//             u.pw = ${pw_c}
//           `;//암호화 한 데이터(pw)를 기반으로 검색 진행
//         const query1 = await pool.query(sql1);//조회 알고리즘
//         console.log(`abc ${query1.rows[0]}`);
//         if (jkh_fun.isEmpty(query1.rows[0].username)) {
//             console.log('login fail');
//             jkh_fun.webhook('err', response.msg)//log 보내는 역활
//             return null;
//         }
//         else {
//             let user_id = query1.rows[0].user_id;//사용자 key 추출
//             user = query1.rows[0];
//             //res.cookie('auth', true);//쿠키생성 추후 수정예정
//             const sql2 = 
//             Q`insert into login_log(user_id,log_time) values (${user_id},${jkh_fun.date_time()})`;
//             const query2 = await pool.query(sql2);
//             if (query2.errors) {
//                 console.log(query2.errors);
//                 jkh_fun.webhook('err', 'login sql insert err(500)');
//             }
//         }

//         return user;
//     }
//     catch (err) {
//         console.error(err);
//         jkh_fun.webhook('err', 'login sql select err(500)')//log 보내는 역활
//     }
// }//login 
// console.log('sad'+index('1@1','1234'));
// const express = require('express');

// const app = express();
// const port = 3000;
// const path = require('path');
// var static = require('serve-static');
// app.use('/w', static(path.join(__dirname, 'public'))); 
// //----------------
// app.get('/', (req, res) => {
//   return res.redirect(302,'/w/index.html');//sendFile(`C:/Users/whdgu/Documents/study/public/index.html`);
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// var pw_c = jkh_fun.cipheriv("simple123");//암호화 진행 //iv 버전으로 수정 필수 !!!!
// console.log(pw_c);

const a = (n) =>{
    var sum =0;
    for(var i =1 ; i<10;i++ ){
        if(i%2 == 1)
        {
            sum += n*i;
        }
    }
   return sum;
}
var x = 10 ,y=10;
console.log((y-- + 3)); // y=y +1 
console.log(1+2+3+"4");//y = 즉 '='대입연산자를 활용해 변수의 값을 변형 시킴 