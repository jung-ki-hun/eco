// const pi = 3.14;
// const r = 1.4;
// const h = 1.5;
// console.log(pi*r*r*h);
const { pool, Q } = require('../../db/psqldb');

const dbtest = async () => {

    try {
        const sql1 = Q`
            SELECT 
              u.username,
              ul.level_u
            FORM
              users u, users_level ul
            WHERE        
              ul.level_u in (select level_u form users_level ul2, users u2 WHERE u2.user_id = ul2.user_id)
              AND
              u.email = ${params.id}
              AND
              u.pw = ${params.pw}
            `;//
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (jkh.isEmpty(query1.rows)) {
            jkh.webhook('err', response.msg)//log 보내는 역활
            return 'empty';
        }
        else {
            return query1.rows;
        }


    }
}
console.log(dbtest());