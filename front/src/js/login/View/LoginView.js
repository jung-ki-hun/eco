import View from "../../_origin/View.js";

/**
 * Login 관리 View
 * @class
 */
class LoginView extends View{
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

    }
}

export default LoginView;