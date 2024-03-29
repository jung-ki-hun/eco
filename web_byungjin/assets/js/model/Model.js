/**
 * Model Object
 * @param api_path Data를 가져올 Api 주소
 * @param api_info api에 접근에 필요한 정보
 * @returns {ModelObj} api에 접근하는 Object 반환
 */
export function CreateModel(api_path, api_info) {
    return {
        getApiPath() {
            return api_path;
        },
        getApiInfo() {
            return api_info;
        },
        read(query = "") {
            return new Promise(resolve => {
                try {
                    this.debug("Fetch(Get) : " + api_path + query);
                    fetch(api_path + query, api_info).then((response) => {
                        if (response.status == 200 || response.status == 201)
                            response.json().then(data => resolve({ error: null, data }));
                        else {
                            resolve({ error: Error("Status Not 200 or 201"), data: null });
                            throw Error(`"Status Not 200 or 201"`);
                        }
                    });
                }
                catch (error) {
                    console.error(error);
                    resolve({ error, data: null });
                }
            });
        },
        sendPost(body) {
            return new Promise(resolve => {
                try {
                    this.debug("Fetch(Post) : " + api_path);
                    api_info.method = 'POST';
                    api_info.body = body;
                    fetch(api_path, api_info).then(response => {
                        if (response.status == 200 || response.status == 201)
                            response.json().then(data => resolve({ error: null, data }));
                        else {
                            throw Error(`${api_path} : not good response`);
                        }
                    });
                }
                catch (error) {
                    console.error(error);
                    resolve({ error, data: null });
                }
            });
        },
        debug(msg) {
            if (window.DEBUG != null && window.DEBUG == true) {
                console.log("[Model]" + msg);
            }
        }
    };
}
//# sourceMappingURL=Model.js.map