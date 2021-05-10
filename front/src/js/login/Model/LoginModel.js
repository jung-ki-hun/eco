import Model from "../../_origin/Model.js";

/**
 * Login을 위한 Model
 * @class
 */
class LoginModel extends Model{
    /**
     * @constructor
     * @param {String} url
     */
    constructor(url){
        super(url);
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
        await this.message
    }
}

export default LoginModel;