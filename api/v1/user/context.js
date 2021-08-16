//const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');

const test =  (req,res)=>{
    var ress = {
        data:'hi 성덕 hangul'
    }
    return res.status(200).json(ress);
}

module.exports = (app) => {
    app.group([],(router)=>{
      ///router.get('/login', get_name),//사용자 닉네임 요청
      router.post('/test',test);//api/v1/user/context/test
      ///router.post('/regiser', regiser)//회원가입
      });
  }