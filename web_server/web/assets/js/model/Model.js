/**
 * Model Object
 * @param api_path Data를 가져올 Api 주소
 * @param api_info api에 접근에 필요한 정보
 * @returns {ModelObj} api에 접근하는 Object 반환
 */
export default function (api_path, api_info = null) {
    return {
        api_path,
        api_info,
        getApiPath: function () {
            return api_path;
        },
        getApiInfo: function () {
            return api_info;
        },
        read: async function () {
            return new Promise(resolve => {
                try {
                    fetch(api_path, api_info).then((response) => {
                        if (response.status == 200 || response.status == 201)
                            resolve({ error: null, response });
                        else
                            throw Error(`${api_path} : not good response`);
                    });
                }
                catch (error) {
                    console.error(error);
                    resolve({ error, response: null });
                }
            });
        },
    };
}
//# sourceMappingURL=Model.js.map