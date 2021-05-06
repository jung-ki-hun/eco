import LocalCom from "../Model/LocalCom.js"

export default {
    start : function(){
        let localCom = new LocalCom();        
        localCom.message();
    }
}