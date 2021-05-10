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
     */
    /**
     * @type {ScreenData}
     */
    screenData = {              
        totalHeight : 0,
        screenHeight : 0,                
    }
    /**
     * @typedef {Object} ScrollingData
     * @property {number} scrollStatus
     * @property {number} currentPosition
     * @property {number} previousPosition
     * @property {number} rate
     * @property {number} delta
     * @property {number} multiple 
     * @property {boolean} direction
     */
    /**
     * @type {ScrollingData}
     */
    scrollingData = {
        scrollStatus : null,
        currentPosition : 0,
        previousPosition : 0,
        delta : 0,
        multiple : 8,
        rate : 0,
        direction : true
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
        this.calcDirection();
    }
    resetScreenData(){        
        this.screenData.screenHeight = window.innerHeight;
        this.screenData.totalHeight = document.body.scrollHeight - this.screenData.screenHeight;        
        this.onScroll();
    }
    calculatePosition(){
        this.scrollingData.previousPosition = this.scrollingData.currentPosition;
        this.scrollingData.currentPosition = document.body.scrollTop;                
        this.scrollingData.rate = (this.scrollingData.currentPosition / this.screenData.totalHeight * 100).toFixed(2);
    }
    placeScrollbar(){       
        this.el.style.height = (this.scrollingData.rate/100*this.screenData.screenHeight).toFixed(2)+"px";
    }
    /**
     * Scroll 방향 결정
     */
    calcDirection(){
        let previousDirection = this.scrollingData.direction;
        if(this.scrollingData.currentPosition > this.scrollingData.previousPosition){
            this.scrollingData.direction = true;
        }else{
            this.scrollingData.direction = false;
        }
        if(previousDirection != this.scrollingData.direction){
            this.emit("@direction", this.scrollingData.direction);
        }        
    }
    /**
     * Scroll 이동
     * @param {number} position 
     */
    goTo(position){
        if(!this.scrollingData.scrollStatus){
            cancelAnimationFrame(this.scrollingData.scrollStatus);
        }            
        let direction = 0;
        if(this.scrollingData.currentPosition < position){
            direction = 1;
        }else{
            direction = -1;
        }
        this.scrollingData.delta = this.scrollingData.multiple;
        this.scrollingData.scrollStatus = requestAnimationFrame(()=>this.setScroll(position,direction));
    }
    /**     
     * @param {number} position 
     * @param {number} delta 
     */
    setScroll(position, delta){        
        if(document.body.scrollTop >= position){            
            cancelAnimationFrame(this.scrollingData.scrollStatus);
        }else{                        
            document.body.scrollTop += (delta * this.scrollingData.delta);            
            this.scrollingData.delta += this.scrollingData.multiple;            
            requestAnimationFrame(()=>this.setScroll(position,delta));
        }
    }
}

export default ScrollView;