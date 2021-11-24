import { View, getView } from "../View.js"
import { getNoteApi } from "../../../js/util/Note.js"
import { ModelObj, ModelResult, CreateModel} from "../../model/Model.js"

interface NoteApi{
    getTextPlain() : string,
    getTextHTML() : string,
    setup(target_str : string) : void
}

interface BoardWrite extends View, NoteApi{  
    model : ModelObj,  
    init(el : HTMLElement, note_element_str) : void,
    onWrite() : void,
    eventDispatcher() : void,
    initModel(),
    sendBoardInfo(): void,
}

const boardWrite : BoardWrite = {  
    model : null,
    ...getNoteApi(),  
    ...getView(),
    init(el : HTMLElement, note_element_str){
        this.setEl(el)
        this.setup(note_element_str)
        this.eventDispatcher()
        this.initModel()
    },
    eventDispatcher(){
        this.on('click', (evt)=>{
            if((evt.target as Element).className == 'submit'){
                this.onWrite()
            }
        })
    },
    initModel(){
        let header = new Headers()
        header.append('Content-Type', 'application/json;charset=utf-8')
        let api_info : RequestInit = { 
            method : "POST",      
            headers : header,                
        }
        this.model = CreateModel("http://khkh0130.shop:4000/api/v1/user/context_j/board/write", api_info)        
    },
    onWrite(){
        let p_text = this.getTextPlain()

        if(p_text == null)
            throw new Error("글쓰기 오류!")
        if(p_text.length == 0){
            alert("게시글의 내용이 없습니다.");
            return;
        }
        this.sendBoardInfo()
    },
    sendBoardInfo(){        
        this.model.sendPost(JSON.stringify({
            'name' : 'hellott',
            'title' : 'title', //1000
            'content' : this.getTextHTML(),            
            'filename' : null
        })).then(v=>{
            console.log(v)
        }).catch(e=>{
            console.log(e)
        })
        console.log(this.model.getApiInfo())
    }
}

boardWrite.init(document.querySelector("#controls"), '#note')