import { getView } from "../View.js";
import { CreateModel } from "../../model/Model.js";
const boardView = {
    record_per_page: 50,
    prevPage: null,
    pageView: null,
    tableView: null,
    searchView: null,
    model: null,
    records: null,
    ...getView(),
    init(el) {
        this.setEl(el);
        this.setPageView();
        this.setSearchView();
        this.setTableView();
        this.eventDispatcher();
        // this.assignRecords(test())
        this.setModel();
    },
    setModel() {
        this.model = CreateModel("http://khkh0130.shop:4000/api/v1/user/context_j/test");
        this.model.read().then((v) => {
            if (v.data != null) {
                this.onRecordComeIn(v.data);
            }
            else {
                console.error(v.error);
            }
        });
    },
    getSearchView() {
        return this.searchView;
    },
    setSearchView() {
        this.searchView = getView(this.selEl("#search"));
    },
    setPageView() {
        this.pageView = getView(this.selEl("#pages"));
    },
    getPageView() {
        return this.pageView;
    },
    setTableView() {
        this.tableView = getView(this.selEl(".table_records"));
    },
    getTableView() {
        return this.tableView;
    },
    assignRecords(page) {
        let len = this.records.length;
        this.getTableView().getEl().innerHTML = this.records.slice(Math.min(len, (page - 1) * this.record_per_page), Math.min(len, page * this.record_per_page)).reduce((acc, cur) => {
            return acc + `<tr>
                <td>${cur.count}</td>
                <td>${cur.title}</td>
                <td>${cur.user}</td>
                <td>${cur.date}</td>
            </tr>`;
        }, "");
    },
    paging(current) {
        this.getPageView().getEl().innerHTML = "";
        let number_of_page = Math.ceil(this.records.length / (this.record_per_page * 1.0));
        let i = Math.max(1, current - 4);
        let range = i + 10;
        for (; i < range && i <= number_of_page; i++) {
            let newEl = document.createElement('div');
            if (i == current) {
                newEl.className = "sel";
                this.prevPage = newEl;
            }
            newEl.textContent = i.toString();
            this.getPageView().getEl().appendChild(newEl);
        }
    },
    onClickPage(pageEl) {
        if (this.prevPage != null) {
            this.prevPage.classList.remove("sel");
        }
        this.prevPage = pageEl;
        pageEl.classList.add("sel");
        this.assignRecords(parseInt(pageEl.textContent));
    },
    onClickRecord(record) {
        alert("Record Click");
        // window.open("https://www.youtube.com", "_blank")
    },
    onRecordComeIn(data) {
        this.records = data;
        this.assignRecords(1);
        this.paging(1);
    },
    eventDispatcher() {
        this.getTableView().on("click", (evt) => {
            let element = evt.target;
            if ((element = this.getTargetEl(element, "TBODY", "TR")) != null)
                this.onClickRecord(element);
        });
        this.getSearchView().on("submit", (evt) => {
            this.onSearch(this.getSearchView().selEl("input[type='text']").value);
            evt.preventDefault();
        });
        this.getPageView().on('click', (evt) => {
            let element = evt.target;
            if (element.tagName == "DIV" && element.className != "sel" && element.id != "pages") {
                this.onClickPage(element);
            }
        });
    },
    onSearch(str) {
        if (str.length >= 2) {
            //TODO search
        }
        else {
            alert("2자 이상 입력하세요.");
        }
    }
};
boardView.init(document.querySelector("#board"));
export default boardView;
//# sourceMappingURL=boardTable.js.map