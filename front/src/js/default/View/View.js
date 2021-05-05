// Default View Class
class View{
    v_name = "Default View";
    /**
     * @type {Element}
     */
    el = null;
    setup = function(el){
        if(!el){
            console.log(this.v_name + "No Element!");
            return;
        }else{
            this.el = el;            
        }
    }
    emit = function(name, data){
        let evt = new CustomEvent(name, {detail:data});
        this.el.dispatchEvent(evt);
        return this;
    }
    hear = function(evt, fn){        
        this.el.addEventListener(evt, fn);
        return this;        
    }
    isElement = function(){
        if(this.el) return true;
        else false;
    }
}

export default View;