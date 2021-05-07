import View from "../../_origin/View.js";

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
     * @typedef {Object} ScrollingData
     * @property {number} scrollStatus
     * @property {number} multiple
     */
    /**
     * @type {ScrollingData}
     */
    scrollingData = {
        scrollStatus : null,
        multiple : 5
    }    
    /**
     * @constructor
     * @param {HTMLElement} el
     * @param {number} scrollHeight
     */
    constructor(el, multiple){
        super("ScrollView");        
        this.setup(el);
        if(this.isElement()){
            this.scrollingData.multiple = multiple;             
            this.resetScreenData();
            this.bindEvents();
        }else{
            this.push("Error no document");
        }            
    }
    bindEvents(){
        //Scroll Event
        document.body.addEventListener('scroll', ()=>this.onScroll())        
        //Resize Event
        window.addEventListener("resize", ()=>this.onResize());
    }
    /**
     * @event     
     */
    onResize(){
        this.resetScreenData();
    }
    onScroll(){        
        this.calculatePosition();        
        this.placeScrollbar();
    }
    resetScreenData(){        
        this.screenData.screenHeight = window.innerHeight;
        this.screenData.totalHeight = document.body.scrollHeight - this.screenData.screenHeight;        
        this.onScroll();
    }
    calculatePosition(){
        this.screenData.previousHeight = this.screenData.currentHeight;
        this.screenData.currentHeight = document.body.scrollTop;                
        this.screenData.rate = (this.screenData.currentHeight / this.screenData.totalHeight * 100).toFixed(2);
    }
    placeScrollbar(){       
        this.el.style.height = (this.screenData.rate/100*this.screenData.screenHeight).toFixed(2)+"px";
    }
    /**
     * Scroll 이동
     * @param {number} position 
     */
    goTo(position){
        if(!this.scrollingData.scrollStatus){
            cancelAnimationFrame(this.scrollingData.scrollStatus);
        }            
        let delta = 0;
        if(this.screenData.currentHeight < position){
            delta = 1;
        }else{
            delta = -1;
        }
        this.scrollingData.scrollStatus = requestAnimationFrame(()=>this.setScroll(position,delta));
    }
    /**     
     * @param {number} position 
     * @param {number} delta 
     */
    setScroll(position, delta){        
        if(document.body.scrollTop >= position){            
            cancelAnimationFrame(this.scrollingData.scrollStatus);
        }else{
            document.body.scrollTop += (delta * this.scrollingData.multiple);            
            requestAnimationFrame(()=>this.setScroll(position,delta));
        }
    }
}

export default ScrollView;