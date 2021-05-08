import Model from "../../_origin/Model.js"

/**
 * HTML를 받아오는 Model
 * @class
 */
class PageModel extends Model{    
    /**
     * @constructor
     */
    constructor(){
        super("PageModel", "answer_board.html");
        this.message();
    }
}

export default PageModel;