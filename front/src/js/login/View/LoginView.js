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
     * @property {HTMLElement} alertEl
     */
    /**
     * @type {loginElements}
     */
    loginElements = {
        identificationEl : null,
        passwordEl : null,
        submitBtnEl : null,
        alertEl : null,
    }
    /**
     * @constructor
     * @type {HTMLElement}
     */
    constructor(el){
        super("LoginView");
        this.setup(el);
        if(this.isElement()){
            this.loginElements.identificationEl = this.get(".identification");
            this.loginElements.passwordEl = this.get(".password");
            this.loginElements.submitBtnEl = this.get(".submit");
            this.loginElements.alertEl = this.get(".display");
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
        return loginData;
        //Todo Something
    }    
    submit(){
        this.emit("@submit", this.getLoginData());
    }
    /**
     * 로그인 성공 유무
     * @param {Boolean} success
     */
    onSubmit(success){
        if(!success){
            this.displaySomething("로그인 실패...");
        }else{
            //TODo
        }
    }
    /**
     * Alert Element에 String을 표시함
     * @param {String} content 
     */
    displaySomething(content){
        this.loginElements.alertEl.innerText = content;
    }
}

export default LoginView;