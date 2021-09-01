/**
 * Login을 위한 Model
 */
import Model from "./Model.js";
const certi = { "email": "123@123", "password": "100" };
(async function () {
    const { getApiPath, getApiInfo, read } = Model("/api/v1/user/login/in", {
        method: 'POST',
        body: JSON.stringify(certi),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const { error, data } = await read();
    if (error == null)
        console.log(data);
    console.table({ path: getApiPath(), info: getApiInfo() });
})();
//# sourceMappingURL=loginModel.js.map