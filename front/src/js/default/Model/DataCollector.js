class DataCollecter{
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
     * @param {String} url 
     */
    constructor(url){
        if(url.length != 0){
            this.urlpath = url;
            this.canMessage = true;
        }            
        else{
            console.log("Error not right URL!!");
            this.canMessage = false;
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
            console.log("Error you can't message!");
        }            
    }
    /**
     * @callback
     * @type {Function}
     * @param {Response} res
     */
    fetchCallBack(res){                
        if(res.status == 200 || res.status == 201){            
            res.text().then(this.onGet);
            this.errorDuplicated = 0;
        }else{                        
            console.log("Not good Conversation!");            
            this.errorDuplicated++;
            if(this.errorDuplicated >= 3){
                this.canMessage = false;
                console.log("Refresh Page.");
            }
        }
    }
    /** 
     * Please Override, this function will run if message come.    
     * @param {String} text 
     */
    onGet(text){
        
    }
}

export default DataCollecter;