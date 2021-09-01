/**
 * BoastBoard를 위한 데이터 수집 모델
 */
import Model from "./Model.js"

(async function(){     
    const {getApiInfo, getApiPath, read} = Model("/fetch_test.json");    
    const {error, data} = await read();    

    if(error == null)
        console.log(data);
    console.table({path:getApiPath(), info:getApiInfo()});
})();