// Default View Class
/**
 * 기본 View Class
 * @class
 */
class View{
    /**
     * @type {String}
     */
    v_name = "";
    /**
     * @type {HTMLElement}
     */
    el = null;
    /**
     * @constructor
     * @param {String} viewName
     */
    constructor(viewName = ""){
        if(viewName.length > 0)
            this.v_name = "["+viewName+"]";
    }
    /**     
     * Element 등록
     * @param {HTMLElement} el      
     */
    setup(el){        
        if(!el){
            this.push("No Element!");
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
    emit(name, data){
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
    hear(evt, fn){        
        this.el.addEventListener(evt, fn)
        return this     
    }
    /**     
     * 등록된 Element가 있는지 확인
     * @returns {Boolean}
     */
    isElement(){
        if(this.el) return true;
        else false;
    }
    /**
     * Element안의 요소 가져오기
     * @param {String} specifier 
     */
    get(specifier){        
        return this.el.querySelector(specifier);
    }
    /**
     * Alert Something using Console...
     * @param {String} content 
     */
    push(content){        
        console.log(this.v_name+ " - " + content);
    }
}

export default View;