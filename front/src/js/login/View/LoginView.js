import View from "../../_origin/View.js";

/**
 * Login 관리 View
 * @class
 */
class LoginView extends View{
    /**
     * @typedef {Object} LoginData
     * @property {String} identification
     * @property {String} password
     */
    /**
     * @typedef {Object} LoginElements
     * @property {HTMLElement} identificationEl
     * @property {HTMLElement} passwordEl
     * @property {HTMLElement} submitBtnEl
     * @property {HTMLElement} alertEl
     */
    /**
     * @type {LoginElements}
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
        /**
         * @type {LoginData}
         */
        const loginData = {
            identification : this.loginElements.identificationEl.value,
            password : this.loginElements.passwordEl.value
        }
        return loginData;
        //Todo Something
    }    
    submit(){
        let data = this.getLoginData();
        if(this.judgeSumbit(data)){
            this.emit("@submit", data);
        }
    }
    /**
     * 5자리 제한
     * @param {LoginData} d 
     */
    judgeSumbit(d){
        if(d.identification.length < 5 || d.password < 5){
            this.displaySomething("5자리 이상 입력해주세요.");
            return false;
        }else{
            return true;
        }
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