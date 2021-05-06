// Default View Class
class View{
    v_name = "Default View";
    /**
     * @type {HTMLElement}
     */
    el = null;
    /**     
     * @param {HTMLElement} el      
     */
    setup = function(el){
        if(!el){
            console.log(this.v_name + "No Element!");
            return;
        }else{
            this.el = el;            
        }
    }
    /**     
     * @param {String} name 
     * @param {*} data 
     * @returns {ThisType}
     */
    emit = function(name, data){
        let evt = new CustomEvent(name, {detail:data});
        this.el.dispatchEvent(evt);
        return this;
    }
    /**     
     * @param {String} evt 
     * @param {Function} fn 
     * @returns {ThisType}
     */
    hear = function(evt, fn){        
        this.el.addEventListener(evt, fn);
        return this;        
    }
    /**     
     * @returns {Boolean}
     */
    isElement = function(){
        if(this.el) return true;
        else false;
    }
}

export default View;