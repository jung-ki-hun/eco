// const pi = 3.14;
// const r = 1.4;
// const h = 1.5;
// console.log(pi*r*r*h);

const { pool, Q } = require('../../db/psqldb');
const jkh = require('../v1/function/jkh_function');
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
console.log(jkh.cipheriv(`1234`));//테스트해보기