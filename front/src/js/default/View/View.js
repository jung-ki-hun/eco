// Default View Class
/**
 * 기본 View Class
 * @class
 */
class View{
    /**
     * @type {String}
     */
    v_name = "Default View";
    /**
     * @type {HTMLElement}
     */
    el;
    /**
     * @constructor
     * @param {String} viewName
     */
    constructor(viewName = ""){
        if(viewName.length > 0)
            this.v_name = viewName        
    }
    /**     
     * Element 등록
     * @param {HTMLElement} el      
     */
    setup = function(el){        
        if(!el){
            console.log(this.v_name + "No Element!")
            return;
        }else{
            this.el = el                        
        }
    }
    /**     
     * 이벤트 촉발
     * @param {String} name 
     * @param {*} data 
     * @returns {ThisType}
     */
    emit = function(name, data){
        let evt = new CustomEvent(name, {detail:data})
        this.el.dispatchEvent(evt)                
        return this
    }
    /**  
     * 이벤트 callback 등록   
     * @param {String} evt 
     * @param {Function} fn 
     * @returns {ThisType}
     */
    hear = function(evt, fn){        
        this.el.addEventListener(evt, fn)
        return this     
    }
    /**     
     * 등록된 Element가 있는지 확인
     * @returns {Boolean}
     */
    isElement = function(){
        if(this.el) return true;
        else false;
    }
    /**
     * Element안의 요소 가져오기
     * @param {String} specifier 
     */
    get = function(specifier){        
        return this.el.querySelector(specifier)
    }
}

export default View;