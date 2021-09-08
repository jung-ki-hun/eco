/**
 * BoastBoard를 위한 데이터 수집 모델
 */
import { CreateModel } from "./Model.js";
(async function () {
    const { getApiInfo, getApiPath, read } = CreateModel("/fetch_test.json");
    const { error, data } = await read();
    if (error == null)
        console.log(data);
    console.table({ path: getApiPath(), info: getApiInfo() });
})();
//# sourceMappingURL=boastModel.js.map