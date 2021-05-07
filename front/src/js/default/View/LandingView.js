import View from "../../_origin/View.js";

/**
 * Landing View 관리
 * @class
 */
class LandingView extends View{
    /**
     * @constructor
     * @param {HTMLElement} el 
     */
    constructor(el){
        super("LandingView");
        this.setup(el);
        if(this.isElement()){
            this.bindEvents();
        }
    }
    bindEvents(){
        //Click
        this.el.addEventListener('click', (e)=>this.onClick(e));
    }
    /**
     * @event
     * @param {Event} e
     */
    onClick(e){
        this.emit("@click", null);
    }
}

export default LandingView;