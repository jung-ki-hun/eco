import { getView } from "../View.js";
import { CreateModel } from "../../model/Model.js";
const boardView = {
    ...getView(),
    model: null,
    titleView: null,
    contentView: null,
    commentView: null,
    init(el) {
        this.setEl(el);
        this.setTitleView();
        this.setCommentView();
        this.setContentView();
        this.eventDispatcher();
        this.setModel();
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
    },
    onRecordComeIn(data) {
        console.log(data);
        this.getContentView().getEl().innerHTML = data.query[0].content;
    },
    setModel() {
        this.model = CreateModel("http://khkh0130.shop:4000/api/v1/user/context_j/veiw");
        this.model.read(window.location.search).then(v => {
            if (v.data != null) {
                this.onRecordComeIn(v.data);
            }
        });
    }
};
boardView.init(document.querySelector("#board"));
//# sourceMappingURL=boardView.js.map