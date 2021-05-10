
import Model from "../../_origin/Model.js"

/**
 * 질문 가져오기, 검색하기
 * @class
 */
class QuestionModel extends Model{
    /**
     * @constructor
     */
    constructor(){
        super("QuestionModel", "input URL");                    
        this.onGet = (data)=>{
            this.jdata = JSON.parse(data);
        }
    }
    getBoardData(){
        return new Promise((res)=>{
            this.message().then(()=>{
                res();
            })
        });
    }
    /**
     * 검색(JSON에서)
     * @param {String} q 
     */
    search(q){
        if(!this.jdata){
            this.push("Search!");
        }else{
            this.getBoardData().then(()=>{
                this.search(q);
            });            
        }
    }
}

export default QuestionModel;