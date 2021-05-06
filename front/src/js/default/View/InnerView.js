import View from "./View.js";

/**
 * @class
 */
class InnerView extends View{
    /**
     * @constructor
     * @param {HTMLElement} el
     */
    constructor(el){
        super("InnerView");
        this.setup(el)        
        if(this.isElement())
            this.bindEvents();
    }
    /**
     * @type {Function}
     */
    bindEvents(){
        
    }
    /**     
     * @param {String} data 
     */
    transformInner(data){
        if(data.length > 0){
            this.el.innerHTML = data;   
        }
    }
}

export default InnerView;