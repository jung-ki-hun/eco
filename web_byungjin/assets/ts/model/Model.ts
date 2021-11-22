/**
 * Model Interface
 */
export interface ModelObj{    
    /** API 주소 반환
     * @returns {String}
     */
    getApiPath():string,
    /** API 접근 설정 반환
     * @returns {String}
     */
    getApiInfo():RequestInit    
    /** API 접속
     * @returns {Promise<ModelResult>}
     */
    read():Promise<ModelResult>
}
export interface ModelResult{
    error:Error
    data: Object
}
/**
 * Model Object
 * @param api_path Data를 가져올 Api 주소
 * @param api_info api에 접근에 필요한 정보
 * @returns {ModelObj} api에 접근하는 Object 반환
 */
export function CreateModel(api_path:string, api_info?:RequestInit): ModelObj{    
    return {       
        getApiPath():string{
            return api_path;
        },        
        getApiInfo():RequestInit{
            return api_info;
        }, 
        read():Promise<ModelResult>{
            return new Promise(resolve=>{        
                try{
                    fetch(api_path, api_info).then((response)=>{                    
                        if(response.status == 200 || response.status == 201)
                            response.json().then(data=>resolve({error:null, data}));
                        else  
                            throw Error(`${api_path} : not good response`);            
                    });
                }catch(error){
                    console.error(error);
                    resolve({error, data:null});
                }                 
            });            
        },
        
    }
}