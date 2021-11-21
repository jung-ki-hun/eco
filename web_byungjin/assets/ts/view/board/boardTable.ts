import { View, getView } from "../View.js"

interface Record {
    title : String,
    user : String,
    count : Number,
    date : Date
}

interface BoardView extends View{
    record_per_page : number,
    prevPage : Element,
    pageView : View,
    tableView : View,  
    searchView : View,  
    records : Array<Record>, 
    init(el : HTMLElement) : void,
    getPageView() : View,
    setPageView() : void,
    getTableView() : View,
    setTableView() : void,
    getSearchView() : View,
    setSearchView() : void,
    assignRecords(records : Array<Record>) : void,
    paging(current: number, number_of_records : number) : void,
    eventDispatcher() : void,
    onRecordComeIn(data : JSON) : void,        
    onClickRecord(record : HTMLElement): void,
    onClickPage(pageEl : Element) : void,
    onSearch(str : String) : void,
}

const boardView : BoardView = {
    record_per_page : 50,
    prevPage : null,
    pageView : null,
    tableView : null,
    searchView: null,
    records : null,
    ...getView(),
    init(el : HTMLElement){        
        this.setEl(el)
        this.setPageView()
        this.setSearchView()
        this.setTableView()
        this.eventDispatcher()
        this.assignRecords(test())
    },
    getSearchView(){
        return this.searchView
    },
    setSearchView(){
        this.searchView = getView(this.selEl("#search"))
    },
    setPageView(){        
        this.pageView = getView(this.selEl("#pages"))
    },
    getPageView(){
        return this.pageView
    },
    setTableView(){            
        this.tableView = getView(this.selEl(".table_records"))
    },
    getTableView(){
        return this.tableView
    },
    assignRecords(records : Array<Record>){
        this.getTableView().getEl().innerHTML = records.reduce((acc, cur)=>{            
            return acc + `<tr>
                <td>${cur.count}</td>
                <td>${cur.title}</td>
                <td>${cur.user}</td>
                <td>${cur.date}</td>
            </tr>`
        }, "") 
        
        //test
        this.records = records
        this.paging(1, this.records.length)
    },
    paging(current: number, number_of_records : number){
        this.getPageView().getEl().innerHTML = ""
        
        let number_of_page = Math.ceil(number_of_records / (this.record_per_page * 1.0))
        let i = Math.max(1, current - 4)
        let range = i + 10        
        for(; i < range && i <= number_of_page; i++){
            let newEl = document.createElement('div')
            if(i == current){
                newEl.className = "sel"
                this.prevPage = newEl
            }
            newEl.textContent = i.toString()
            this.getPageView().getEl().appendChild(newEl)
        }
    },
    onClickPage(pageEl : Element){
        if(this.prevPage != null){
            this.prevPage.classList.remove("sel")            
        }
        this.prevPage = pageEl
        pageEl.classList.add("sel")

    },
    onClickRecord(record: HTMLElement){
        window.open("https://www.youtube.com", "_blank")
    },
    onRecordComeIn(data : JSON){
        //Store records
        this.records = null
    },
    eventDispatcher(){        
        this.getTableView().on("click", (evt : Event)=>{
            let element = evt.target as Element            
            if((element = this.getTargetEl(element, "TBODY", "TR")) != null)
                this.onClickRecord(element as HTMLElement)
        })  
        
        this.getSearchView().on("submit", (evt : Event)=>{                        
            this.onSearch((this.getSearchView().selEl("input[type='text']") as HTMLInputElement).value)
            evt.preventDefault()
        })

        this.getPageView().on('click', (evt : Event)=>{
            let element = evt.target as Element
            if(element.tagName == "DIV" && element.className != "sel" && element.id != "pages"){                                
                this.onClickPage(element)
            }
        })
    },
    onSearch(str : String){        
        if(str.length >= 2){
            //TODO search
        }else{
            alert("2자 이상 입력하세요.")
        }
    }
}

function test() : Array<Record>{
    let arr : Array<Record> = []
    let i : number = 0
    for(i = 0; i < 50; i++){
        arr.push({
            title : "Hello",
            date : null,
            user : "u",
            count : 0,
        })
    }
    return arr
}

boardView.init(document.querySelector("#board"))

export default boardView
