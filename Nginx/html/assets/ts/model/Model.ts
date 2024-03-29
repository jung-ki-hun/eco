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
    getApiInfo():RequestInit,
    /** API 접속
     * @returns {Promise<ModelResult>}
     */
    read(query? : string):Promise<ModelResult>,
    /**
     * Post Body로 보냄
     * @param body 
     */
    sendPost(body : BodyInit) : Promise<ModelResult>,
    /**
     * 로그 메세지
     * @param msg Log Message
     */
    debug(msg : string) : void
}

export interface ModelData{
    msg : string
    query : Object | Array<Object>
    state : number
}

export interface ModelResult{
    error:Error
    data: ModelData
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
        read(query : string = ""):Promise<ModelResult>{
            return new Promise(resolve=>{        
                try{
                    this.debug("Fetch(Get) : " + api_path + query)
                    fetch(api_path + query, api_info).then((response)=>{                    
                        if(response.status == 200 || response.status == 201)
                            response.json().then(data=>resolve({error:null, data}));
                        else{
                            resolve({error: Error("Status Not 200 or 201"), data : null})
                            throw Error(`"Status Not 200 or 201"`)
                        }                            
                    });
                }catch(error){
                    console.error(error);
                    resolve({error, data:null});
                }                 
            });            
        },
        sendPost(body : BodyInit):Promise<ModelResult>{
            return new Promise(resolve=>{
                try{                    
                    this.debug("Fetch(Post) : " + api_path)
                    api_info.method = 'POST'
                    api_info.body = body
                    fetch(api_path, api_info).then(response=>{
                        if(response.status == 200 || response.status == 201)
                        response.json().then(data=>resolve({error:null, data}));
                        else{
                            throw Error(`${api_path} : not good response`);                       
                        }  
                            
                    })
                }catch(error){
                    console.error(error);
                    resolve({error, data:null});
                }
            })
        },
        debug(msg : string){            
            if((window as any).DEBUG != null && (window as any).DEBUG == true){
                console.log("[Model]" + msg)
            }
        }     
    }
}