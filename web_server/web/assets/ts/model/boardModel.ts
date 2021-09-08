/**
 * Board을 위한 Model
 */
 import {CreateModel} from "./Model.js"

 (async function() {
     const {getApiPath, getApiInfo, read} = CreateModel("", {
         method: 'POST',
         body: JSON.stringify({"email" : "123@123", "password":"100"}),
         headers: {
             "Content-Type": "application/json"
         }
     });
     
     const {error, data} = await read();
     if(error == null)
         console.log(data);
     console.table({path:getApiPath(), info:getApiInfo()});
 })()