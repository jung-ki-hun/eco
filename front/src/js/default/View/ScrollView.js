import View from "./View.js";

/**
 * Scroll 관리
 * @class
 */
class ScrollView extends View{
    /**
     * @typedef {Object} ScreenData     
     * @property {number} totalHeight
     * @property {number} screenHeight
     * @property {number} currentHeight
     * @property {number} previousHeight
     * @property {number} rate
     */
    /**
     * @type {ScreenData}
     */
    screenData = {              
        totalHeight : 0,
        screenHeight : 0,
        currentHeight : 0,
        previousHeight : 0,
        rate : 0
    }
    /**
     * @constructor
     * @param {HTMLElement} el
     */
    constructor(el){
        super();        
        this.setup(el);
        if(this.isElement()){
            console.log(this.el)
            this.resetScreenData();
            this.bindEvents();
        }else{
            console.log("Error no document");
        }            
    }
    bindEvents(){
        //Scroll Event
        this.el.addEventListener('scroll', ()=>console.log("ss"))
        // document.addEventListener("scroll", ()=>console.log("ds"));
        //Resize Event
        // window.addEventListener("resize", ()=>this.onResize());
    }
    /**
     * @event     
     */
    onResize(){
        this.resetScreenData();
    }
    onScroll(){
        console.log("htllo");
        this.screenData.previousHeight = this.screenData.currentHeight;
        this.screenData.currentHeight = document.body.scrollTop;                
    }
    resetScreenData(){
        this.screenData.screenHeight = window.innerHeight;
        this.screenData.totalHeight = document.body.scrollHeight;
        this.onScroll();        
    }
}

export default ScrollView;