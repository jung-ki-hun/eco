import View from "../../_origin/View.js";

/**
 * Controller(Logo, Login, Logout) 관리하는 View
 * @class
 */
class HeaderView extends View{        
    /**
     * @type {HTMLElement}
     */
    loginEl = null;
    /**
     * @type {HTMLElement}
     */
    logoutEl = null;
    /**
     * 현재 로그인 상태
     * @type {Boolean}
     */
    status = false; 
    /**
    * @constructor
    * @param {HTMLElement} el
    */
    constructor(el){
        super("HeaderView");
        this.setup(el);
        if(this.isElement()){                        
            this.loginEl = this.get(".login");
            this.logoutEl = this.get(".logout");
            this.bindEvents();
        }                
    }
    bindEvents(){
        // Click Event
        this.el.addEventListener('click', (e)=>this.onClick(e))
    }
    //Inner Event
    /**     
     * @event
     * @param {CustomEvent} e
     */
    onClick(e){                
        switch(e.target.parentElement.className){
            case "controller":            
                this.emit("@click", e.target.className);
                this.loginEl.classList.toggle("invisible");
                this.logoutEl.classList.toggle("invisible");
                this.status = !this.status;                
                break;
            case "logo":
                //Logo 클릭 시, 기본 사이트로 이동
                this.emit("@click", "answer_board");
                break;                
        }
    }
    /**     
     * HeaderView 감추기(Direction)
     */
    hide(direction){
        console.log(direction)
        //True - 아래, False - 위
        if(direction){
            if(!this.el.classList.contains("hide")){
                this.el.classList.add("hide");
            }
        }else{
            this.el.classList.remove("hide");
        }            
    }
}

export default HeaderView;