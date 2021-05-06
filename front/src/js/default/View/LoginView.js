import View from "./View.js";

class LoginView extends View{    
    /**
    * @constructor
    * @param {HTMLElement} el
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
    //Inner Event
    /**
     * @event
     * @param {CustomEvent} e
     */
    onClick(e){
        console.log(e.target);
    }
}

export default LoginView;