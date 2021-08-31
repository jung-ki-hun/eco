/**
 * BoastBoard를 위한 데이터 수집 모델
 */
import Model from "./Model.js";
const model = Model("/fetch_test.json", {
    method: "GET",
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    body: null
});
const foo = async function () {
    const data = await model.read();
    data.response.json().then(val => {
        console.log(val);
    });
};
foo();
//# sourceMappingURL=boastModel.js.map