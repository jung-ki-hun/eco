import { getView } from "../View.js";
const boardView = {
    ...getView(),
    titleView: null,
    contentView: null,
    commentView: null,
    init(el) {
        this.setEl(el);
        this.setTitleView();
        this.setCommentView();
        this.setContentView();
        this.eventDispatcher();
    },
    setTitleView() {
        this.titleView = getView(this.selEl("#boardHeader"));
    },
    setContentView() {
        this.contentView = getView(this.selEl("#boardContent"));
    },
    setCommentView() {
        this.commentView = getView(this.selEl("#boardComment"));
    },
    getTitleView() {
        return this.titleView;
    },
    getContentView() {
        return this.contentView;
    },
    getCommentView() {
        return this.commentView;
    },
    eventDispatcher() {
        this.getCommentView().on("click", (evt) => {
            if (evt.target.className == "write_comment") {
                this.onWriteComment(this.getCommentView().selEl("textarea").value);
            }
        });
    },
    onWriteComment(str = "") {
        if (str.trim().length == 0) {
            alert("1 자 이상 입력해주세요.");
            return;
        }
    }
};
boardView.init(document.querySelector("#board"));
//# sourceMappingURL=boardView.js.map