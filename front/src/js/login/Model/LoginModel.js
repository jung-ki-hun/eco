import Model from "../../_origin/Model.js";

/**
 * Login을 위한 Model
 * @class
 */
class LoginModel extends Model{
    /**
     * @constructor     
     */
    constructor(){
        super("LoginModel", "");
    }
    /**
     * LoginData Json
     * @typedef {Object} loginData
     * @property {String} identification
     * @property {String} password
     */
    /**
     * @param {loginData} loginData
     * @returns {Boolean}
     */
    async attach(loginData){
        
    }
}

export default LoginModel;