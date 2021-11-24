import { View, getView } from "../View.js"

import { ModelObj, ModelData, CreateModel} from "../../model/Model.js"

interface Record {
    noj_id : number,
    title : string,
    editer : string,
    imagefilename : any,
    count : number,
    createtime: string,
}


interface BoardView extends View{
    record_per_page : number,
    prevPage : Element,
    pageView : View,
    tableView : View,  
    searchView : View,  
    model : ModelObj,
    records : Array<Record>, 
    init(el : HTMLElement) : void,
    setModel() : void,
    getPageView() : View,
    setPageView() : void,
    getTableView() : View,
    setTableView() : void,
    getSearchView() : View,
    setSearchView() : void,
    assignRecords(page : number) : void,
    paging(current: number) : void,
    eventDispatcher() : void,
    onRecordComeIn(data : ModelData) : void,        
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
    model : null,
    records : null,
    ...getView(),
    init(el : HTMLElement){        
        this.setEl(el)
        this.setPageView()
        this.setSearchView()
        this.setTableView()
        this.eventDispatcher()        
        // this.assignRecords(test())
        this.setModel()
    },
    setModel(){
        this.model = CreateModel("http://khkh0130.shop:4000/api/v1/user/context_j/board/list?id=100")
        this.model.read().then((v)=>{
            if(v.data != null){
                console.log(v)
                this.onRecordComeIn(v.data)
            }else{
                console.error(v.error)
            } 
        })
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
    assignRecords(page : number){        
        let len = this.records.length
        this.getTableView().getEl().innerHTML = this.records.slice(Math.min(len, (page-1)* this.record_per_page), Math.min(len, page * this.record_per_page)).reduce((acc, cur)=>{            
            return acc + `<tr>
                <td>${cur.noj_id}</td>
                <td>${cur.title}</td>
                <td>${cur.editer}</td>
                <td>${cur.createtime}</td>
            </tr>`
        }, "")                         
    },
    paging(current: number){
        this.getPageView().getEl().innerHTML = ""
        
        let number_of_page = Math.ceil(this.records.length / (this.record_per_page * 1.0))
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
        this.assignRecords(parseInt(pageEl.textContent))
    },
    onClickRecord(record: HTMLElement){
        alert("Record Click")
        // window.open("https://www.youtube.com", "_blank")
    },
    onRecordComeIn(data : ModelData){              
        this.records = data.query as Record[]       
        this.assignRecords(1)
        this.paging(1)
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

boardView.init(document.querySelector("#board"))

export default boardView
