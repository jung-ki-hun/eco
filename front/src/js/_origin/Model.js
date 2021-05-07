/**
 * 데이터 송수신 Model Class
 * @class
 */
class Model{
    /**
     * Model Name
     * @type {String}
     */
    m_name = "";
    /**     
     * Destination URL.
     * @type {String}
     */
    urlpath = "";
    /**
     * Check status, whether can Message or not.
     * @type {Boolean}
     */
    canMessage = false; 
    /**
     * @type {number}
     */
    errorDuplicated = 0;
    /**
     * Message Setting
     * @type {RequestInit}
     */    
    fetchSetting = null;
    /**
     * @constructor
     * @param {String} name
     * @param {String} url 
     */
    constructor(name, url = ""){
        this.m_name = "["+name+"]";
        this.setURL(url);
    }
    /**
     * Set URL for Communication. Return Success or not;
     * @param {*} url 
     * @returns {Boolean}
     */
    setURL(url){
        if(url.length != 0){
            this.urlpath = url;
            this.canMessage = true;
            return true;
        }            
        else{
            this.push("Error not right URL!!");
            this.canMessage = false;
            return false;
        } 
    }
    /**     
     * @param {RequestInit} resInit 
     */
    fetchInit(resInit){
        this.fetchSetting = resInit;
    }
    /**     
     * @param {JSON} data 
     */
    message(data){
        if(this.canMessage){            
            if(this.fetchSetting != null){
                fetch(this.urlpath, this.fetchSetting).then((res)=>this.fetchCallBack(res));
            }else{
                fetch(this.urlpath).then((res)=>this.fetchCallBack(res));
            }
        }            
        else{
            this.push("Error you can't message!");
        }            
    }
    /**
     * @callback
     * @type {Function}
     * @param {Response} res
     */
    fetchCallBack(res){                
        if(res.status != 404){            
            res.text().then(this.onGet);
            this.errorDuplicated = 0;
        }else{                        
            this.push("Error Not Good Communication...");
            this.errorDuplicated++;
            if(this.errorDuplicated >= 3){
                this.canMessage = false;
                this.push("Error Duplicated(3 times), Refresh page...");
            }
        }
    }
    /** 
     * Please Override, this function will run if message come.    
     * @param {String} text 
     */
    onGet(text){
        
    }
    /**
     * Alert Something using Console...
     * @param {String} content
     */
    push(content){
        console.log(this.m_name + " - " + content)
    }
}

export default Model;