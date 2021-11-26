import { View, getView } from "../View.js"
import { ModelObj, ModelResult, CreateModel } from "../../model/Model.js"

interface BoardView extends View{
    titleView : View,
    contentView : View,
    commentView : View,    
    init(el : HTMLElement) : void,
    setTitleView() : void,
    setContentView() : void,
    setCommentView() : void,
    getTitleView() : View,
    getContentView() : View,
    getCommentView() : View,
    eventDispatcher() : void,
    onWriteComment(str : string) : void
}


const boardView : BoardView = {
    ...getView(),
    titleView : null,
    contentView : null,
    commentView : null,
    init(el : HTMLElement){
        this.setEl(el)
        this.setTitleView()
        this.setCommentView()
        this.setContentView()
        this.eventDispatcher()
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
    }

}

boardView.init(document.querySelector("#board"))