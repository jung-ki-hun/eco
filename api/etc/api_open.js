const request = require('request');
const jkh_fun = require('../v1/function/jkh_function');
const mysql_s =require('../../db/sqldb');
async function index(req, res) {
    // 지역 
    // 원하는 대기정보
    // 사용자 정보
    const params={
        ...req.query,
        ...req.params,
        ...req.body,
        location : req.uesr.location,
        AirDataKind : req.air.kind,
        user_no : req.user.user_no
    }
    const sqlParams=[];
    const sql = `insert `;//db에 공공에이피아이 데이터 저장
    const err = 'do not save';
    const suc = 'save success';
    mysql_s.selectSql(sql,err,suc,sqlParams)
    return res.status(200).json(JSON.stringify(response));
}
module.exports= (app)=> {
    index
}