import View from "./View.js";

class Board extends View{
    /**
     * @type {String}
     */
    rowSpec = "";
    /**
     * @constructor
     * @param {HTMLElement} el
     * @param {String} rowSpecifier
     */
    constructor(el, rowSpecifier){
        super();
        this.rowSpec = rowSpecifier;
        this.setup(el);
        if(this.isElement())
            this.bindEvent();
    }
    bindEvent(){
        //Click Event
        this.el.addEventListener('click', this.onClick)
    }
    /**  
     * @event   
     * @param {CustomEvent} e 
     */
    onClick(e){

    }
}

export default Board;