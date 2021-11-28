import { View, getView } from "../View.js"
import { ModelObj, ModelResult, CreateModel, ModelData } from "../../model/Model.js"
import { Record } from "./Record.js"

interface BoardView extends View{
    model : ModelObj,
    titleView : View,
    contentView : View,
    commentView : View,    
    init(el : HTMLElement) : void,
    setTitleView() : void,
    setContentView() : void,
    setCommentView() : void,
    setModel(),
    getTitleView() : View,
    getContentView() : View,
    getCommentView() : View,
    eventDispatcher() : void,
    onWriteComment(str : string) : void,
    onRecordComeIn(data : ModelData) : void,
}


const boardView : BoardView = {
    ...getView(),
    model : null,
    titleView : null,
    contentView : null,
    commentView : null,
    init(el : HTMLElement){
        this.setEl(el)
        this.setTitleView()
        this.setCommentView()
        this.setContentView()
        this.eventDispatcher()
        this.setModel()
    },
    setTitleView(){
        this.titleView = getView(this.selEl("#boardHeader"))
    },
    setContentView(){
        this.contentView =  getView(this.selEl("#boardContent"))
    },
    setCommentView(){
        this.commentView = getView(this.selEl("#boardComment"))
    },
    getTitleView(){
        return this.titleView
    },
    getContentView(){
        return this.contentView
    },
    getCommentView(){
        return this.commentView
    },
    eventDispatcher(){
        this.getCommentView().on("click", (evt)=>{            
            if((evt.target as Element).className == "write_comment"){                
                this.onWriteComment((this.getCommentView().selEl("textarea") as HTMLInputElement).value)
            }
        })
    },
    onWriteComment(str : string = ""){        
        if(str.trim().length == 0){
            alert("1 자 이상 입력해주세요.")
            return;
        }
    },
    onRecordComeIn(data : ModelData) : void{
        console.log(data)
        this.getContentView().getEl().innerHTML = (data.query[0] as Record).content
    },    
    setModel(){
        this.model = CreateModel("http://khkh0130.shop:4000/api/v1/user/context_j/veiw")        
        

        this.model.read(window.location.search).then(v=>{
            if(v.data != null){
                this.onRecordComeIn(v.data)
            }
        })
    }

}

boardView.init(document.querySelector("#board"))