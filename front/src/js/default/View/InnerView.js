import View from "../../_origin/View.js";

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
    /**
     * 
     * @param {String} url 
     */
    appendScript(url){
        /**
         * @type {HTMLElement}
         */
        let srcNode = document.createElement("script");
        srcNode.setAttribute("type", "module");
        srcNode.setAttribute("src", `./src/js/App/${url}App.js`);        
        this.el.appendChild(srcNode);
    }
}

export default InnerView;