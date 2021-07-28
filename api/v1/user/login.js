const app =express.Router();
const index = (req,res)=>{
    const params={
        ...req.query,
        ...req.params,
        ...req.body,
        location : req.uesr.location,
        AirDataKind : req.air.kind,
        user_no : req.user.user_no
    }
    const sqlParams=[];
    const sql = `select `;//db에 공공에이피아이 데이터 저장
    const err ='do not save';
    const suc ='save success';
    mysql_s.selectSql(sql,err,suc,sqlParams)
    return res.status(200).json(JSON.stringify(response));

}
module.exports = {
index
}