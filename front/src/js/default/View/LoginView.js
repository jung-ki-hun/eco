import View from "./View.js";

class LoginView extends View{    
    /**
    * @param {Element} el
    */
    constructor(el){
        super();
        this.setup(el);
        if(this.isElement()){
            this.bindEvents();
        }                
    }
    bindEvents(){
        // Click Event
        this.el.addEventListener('click', this.onClick)
    }
    /**
     * @param {CustomEvent} e
     */
    onClick(e){
        console.log(e.target);
    }
}

export default LoginView;