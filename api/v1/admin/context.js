// const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');


const index = async (req, res) => {

}
module.exports = (app) => {
        app.get('/login_n', get_name),//사용자 닉네임 요청
        app.post('/regiser', regiser),//회원가입
        app.post('/pwfind', find_pw)//비밀번호 찾기
}