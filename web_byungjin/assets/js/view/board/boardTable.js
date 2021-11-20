import { getView } from "../View.js";
const boardView = {
    pageView: null,
    ...getView(),
    init(el) {
        this.setEl(el);
        this.on("click", this.clickEventDispatcher);
    },
    setPageView() {
        this.pageView = getView(this.selEl(".pages"));
    },
    getPageView() {
        return this.pageView;
    },
    onClickPage(pageNumber) {
    },
    onClickRecord(target) {
    },
    onRecordComeIn(data) {
    },
    clickEventDispatcher(evt) {
        switch (evt.target.className) {
            case "pages":
                break;
            default:
                console.log("not");
        }
    }
};
boardView.init(document.querySelector("#board"));
export default boardView;
//# sourceMappingURL=boardTable.js.map