
/**
 * Controller 기본
 * @class
 */
class Controller{
    /**
     * Controller Name
     * @type {String}
     */
    c_name = ""
    /**
     * @constructor
     * @param {String} name 
     */
    constructor(name= ""){
        this.c_name = "["+name+"]";
    }
    /**
     * Document에서 HTMLElement를 반환
     * @param {String} specifier
     * @returns {HTMLElement}
     */
    get(specifier){
        let element = document.querySelector(specifier);
        if(!element){
            return element;
        }else{
            this.push("Can't find Element!!");
        }
    }
    /**
     * Alert Something using Console...
     * @param {String} content 
     */
    push(content){
        console.log(this.c_name + " - " + content);
    }
}

export default Controller;