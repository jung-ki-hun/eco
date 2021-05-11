/**
 * 데이터 송수신 Model Class
 * @class
 */
class Model{
    /**
     * 가져온 데이터 저장
     * @type {JSON}
     */
    jdata = null;
    /**
     * Model Name
     * @type {String}
     */
    m_name = "";    
    /**
     * @typedef {Object} ModelSetting
     * @property {Boolean} canMessage
     * @property {number} errorDuplicated
     * @property {String} urlpath
     * @property {String} type
     * @property {RequestInit} fetchSetting
     */
    /**
     * @type {ModelSetting}     
     */
    setting = {
        canMessage : false,
        errorDuplicated : 0,
        fetchSetting : null,
        urlpath : "",
        type : ""
    }   
    /**
     * @constructor
     * @param {String} name
     * @param {String} url 
     * @param {String} type
     */
    constructor(name, url = "", type = ""){
        this.m_name = "["+name+"]";
        this.setURL(url);
        this.setting.type = type;
    }
    /**
     * Set URL for Communication. Return Success or not;
     * @param {*} url 
     * @returns {Boolean}
     */
    setURL(url){
        if(url.length != 0){
            this.setting.urlpath = url;
            this.setting.canMessage = true;
            return true;
        }            
        else{
            this.push("Error not right URL!!");
            this.setting.canMessage = false;
            return false;
        } 
    }
    /**
     * @param {String} t
     */
    setType(t){
        this.setting.type = t;
    }
    /**     
     * @param {RequestInit} resInit 
     */
    fetchInit(resInit){
        this.setting.fetchSetting = resInit;
    }
    /**
     * @param {JSON} data
     * @returns {Promise}
     */
    async sentRequest(){
        let totalURL = `${this.setting.urlpath}.${this.setting.type}`;
        return new Promise((response)=>{
            if(this.setting.canMessage){            
                if(this.setting.fetchSetting != null){
                    fetch(totalURL, this.setting.fetchSetting).then((res)=>{                        
                        response(res);
                    });
                }else{
                    fetch(totalURL).then((res)=>{                        
                        response(res);
                    });
                }
            }            
            else{
                this.push("Error you can't message!");
                response(false);
            }
        });  
    }
    /**     
     * @param {JSON} data 
     * @returns {Promise}
     */
    async message(data){    
        /**
         * @type {Response}
         */    
        let response = await this.sentRequest(data);            
        if(!response) return false;
        let value = await this.processResponse(response);
        if(!value) return false;
        this.callback(value);
        return value;        
    }
    /**
     * message가 성공하면 호출됨, 오버라이딩 필요...
     * @callback
     * @param {String} value
     */
    callback(value){

    }
    /**
     * 
     * @param {Response} response 
     */
    async processResponse(response){
        return new Promise((res,rej)=>{
            if(response.status != 404){
                this.setting.errorDuplicated = 0;
                response.text().then((value)=>{
                    res(value);
                })
            }else{
                this.push("Error Not Good Communication...");
                this.setting.errorDuplicated++;
                if(this.setting.errorDuplicated >= 3){
                    this.setting.canMessage = false;
                    this.push("Error Duplicated(3 times), Refresh page...");
                }
                res(false);
            }
        })
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