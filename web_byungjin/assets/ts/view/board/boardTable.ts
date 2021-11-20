import { View, getView } from "../View.js"

interface BoardView extends View{
    pageView : View,
    init(el : HTMLElement) : void,
    getPageView() : View,
    setPageView() : void,
    onRecordComeIn(data : JSON) : void,        
    onClickRecord(target : HTMLElement): void,
    onClickPage(pageNumber : Number) : void,
    clickEventDispatcher(evt : Event) : void,
}

const boardView : BoardView = {
    pageView : null,
    ...getView(),
    init(el : HTMLElement){        
        this.setEl(el)
        this.on("click", this.clickEventDispatcher)
    },
    setPageView(){
        this.pageView = getView(this.selEl(".pages"))
    },
    getPageView(){
        return this.pageView
    },
    onClickPage(pageNumber : Number){

    },
    onClickRecord(target: HTMLElement){

    },
    onRecordComeIn(data : JSON){

    },
    clickEventDispatcher(evt : Event){        
        switch((evt.target as Element).className){
            case "pages":
                break
            default:
                console.log("not")
        }        
    }
}

boardView.init(document.querySelector("#board"))

export default boardView
