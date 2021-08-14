const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');
async const index = (req, res) => {
  const response = {
    state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
    query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
    msg: 'Successful',
  };
  const params = {
    ...req.query,
    ...req.params,
    ...req.body,
    id: req.uesr.email,
    pw: req.user.password
  }
  try {
    /**
     * 1. username get
     * 2. select email
     * 3. select pw
     * 4. select level_d
     * 5. 
     * 6. 
     */
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
    const sql2 = Q`
          insert into login_log(user_id,log_time) values (${sd},${ds})
            `;
    const query1 = await pool.query(sql1);//조회 알고리즘

    response.query = query1.rows[0].user_id;
    const query2 = await pool.query(sql2);

  }
  catch (err) {
    jkh.webhook.sendMessage()//log 보내는 역활
  }
  return res.send(response)

}//login 
const regiser =(req,res) => {
  const response = {
    state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
    query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
    msg: 'Successful',
  };
  const params = {
    ...req.query,
    ...req.params,
    ...req.body,
    id: req.uesr.email,
    pw: req.user.password
  }
  try {
    /**
     * 1. username get
     * 2. select email
     * 3. select pw
     * 4. select level_d
     * 5. 
     * 6. 
     */
    if(jkh.isEmpty(
      params.id,
      params.pw
    )){
      response.state = 2;
      response.msg = 'have not vulse'
      return res.status(500).json(response);
    }
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
    const sql2 = Q`
          insert into login_log(user_id,log_time) values (${},${})
            `;
    const query1 = await pool.query(sql1);//조회 알고리즘
    query1.rows;
    response.query = query1.rows;
    const query2 = await pool.query(sql2);

  }
  catch (err) {
    jkh.webhook.sendMessage()//log 보내는 역활
  }
  return res.send(response)
}
const get_name = (req, res) => {

}//안드로이드에서 사용할듯?

module.exports = (app) => {
  app.get('/login', get_name),
  app.post('/login',index),
  app.post('/regiser',regiser)

}