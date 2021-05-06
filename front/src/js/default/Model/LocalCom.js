import DataCollecter from "./DataCollector.js"

class LocalCom extends DataCollecter{    
    /**
     * @constructor
     */
    constructor(){
        super("default.html");     
        this.onGet = function(text){
            console.log(text);
        }   
    }    
}

export default LocalCom;