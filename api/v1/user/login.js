const app =express.Router();
const {Q,pool} = require('../../../db/psqldb');
const index = (req,res)=>{
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
      };
    const params={
        ...req.query,
        ...req.params,
        ...req.body,
        location : req.uesr.location,
        AirDataKind : req.air.kind,
        user_no : req.user.user_no
    }
    // const sqlParams=[];
    // const sql = `select `;//db에 공공에이피아이 데이터 저장
    // const err ='do not save';
    // const suc ='save success';
    // //mysql_s.selectSql(sql,err,suc,sqlParams)
    // return res.status(200).json(JSON.stringify(response));
    try{
        const sql =Q`
        select 
          user_id`;
        const query1 = await pool.query(sql1);
        response.query = query1.rows;

    }
    catch (err){
        
    }
    return res.send(response)

}
const get_name =()=>{
    
}
module.exports = {
index,
get_name,
}