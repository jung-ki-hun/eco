interface ModelObj{
    getApiPath:()=>string
    getApiInfo:()=>RequestInit    
    read: ()=>Promise<ModelResult>
}
interface ModelResult{
    error:Error
    response:Response
}
/**
 * Model Object
 * @param api_path Data를 가져올 Api 주소
 * @param api_info api에 접근에 필요한 정보
 * @returns {ModelObj} api에 접근하는 Object 반환
 */
export default function(api_path:string, api_info:RequestInit = null): ModelObj{    
    return {              
        getApiPath : function():string{
            return api_path;
        },        
        getApiInfo: function():RequestInit{
            return api_info;
        }, 
        read : async function():Promise<ModelResult>{
            return new Promise(resolve=>{        
                try{
                    fetch(api_path, api_info).then((response)=>{                    
                        if(response.status == 200 || response.status == 201)
                            resolve({error:null, response});  
                        else                      
                            throw Error(`${api_path} : not good response`);            
                    });
                }catch(error){
                    console.error(error);
                    resolve({error, response:null});
                }                 
            });            
        },
        
    }
}