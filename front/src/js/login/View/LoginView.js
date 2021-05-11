import View from "../../_origin/View.js";

/**
 * Login 관리 View
 * @class
 */
class LoginView extends View{
    /**
     * @typedef {Object} loginElements
     * @property {HTMLElement} identificationEl
     * @property {HTMLElement} passwordEl
     * @property {HTMLElement} submitBtnEl
     */
    /**
     * @type {loginElements}
     */
    loginElements = {
        identificationEl : null,
        passwordEl : null,
        submitBtnEl : null,
    }
    /**
     * @constructor
     * @type {HTMLElement}
     */
    constructor(el){
        super("LoginView");
        this.setup(el);
        if(this.isElement()){
            this.bindEvents();
        }
    }
    bindEvents(){
        this.loginElements.submitBtnEl.addEventListener('click', ()=>this.submit());
    }
    getLoginData(){
        const loginData = {
            identification : this.loginElements.identificationEl.innerText,
            password : this.loginElements.passwordEl.innerText
        }
        //Todo Something
    }
    /**
     * @param {loginData} 
     * @returns {Boolean}
     */
    judgeValue(){
        //Okay
        return true;
        //not okay
        return false;
    }
    submit(){
        if(this.judgeValue()){

        }
    }
}

export default LoginView;