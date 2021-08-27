// const pi = 3.14;
// const r = 1.4;
// const h = 1.5;
// console.log(pi*r*r*h);
const { pool, Q } = require('../../db/psqldb');

const dbtest = async () => {

    try {
        const ad =  '1@1';
        const sql1 = Q`
            SELECT 
              u.username
            FROM
              users u
            WHERE       
             u.email = ${ad};
            `;//
        console.log(sql1);
        const query1 = await pool.query(sql1);//조회 알고리즘
        if (jkh.isEmpty(query1.rows)) {
            jkh.webhook('err', response.msg)//log 보내는 역활
            return 'empty';
        }
        else {
            const s = query1.row;
            console.log(s);
            console.log('ddd');
            return s;
        }
    }
    catch (e) {
        //console.error(e.message);
        console.log(e);
    }
}
console.log(dbtest())