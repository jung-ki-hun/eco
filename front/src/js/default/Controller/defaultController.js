// Import Models
import PageModel from "../Model/PageModel.js";
// Import Views
import HeaderView from "../View/HeaderView.js";
import InnerView from "../View/InnerView.js";
import ScrollView from "../View/ScrollView.js";
import LandingView from "../View/LandingView.js";

class Controller {
/* Views */
    /**
     * @type {LoginView}
     */
    headerView = null    
    /**
     * @type {InnerView}
     */
    innerView = null
    /**
     * @type {ScrollView}
     */
    scrollView = null
    /**
     * @type {LandingView}
     */
    landingView = null
/* Models */
    /**
     * @type {PageModel}
     */
    pageModel = null
/* Variable */ 
    /**
     * @type {HTMLElement}
     */
    contentEl = null
    /**
     * @constructor
     */
    constructor(){                
        //Views
        this.headerView = new HeaderView(this.get("header.top"));
        this.innerView = new InnerView(this.get("div.middle .inner"));        
        this.scrollView = new ScrollView(this.get(".customScrollbar"), 13);
        this.landingView = new LandingView(this.get(".landingWrapper"));
        //Models
        this.pageModel = new PageModel();                

        //Variables
        this.contentEl = this.get(".contentWrapper");

        //Binding
        this.landingView.hear("@click", (e)=>this.onLandingClick(e));
        this.headerView.hear("@click", (e)=>this.onControllerClick(e));
        this.pageModel.onGet = (text)=>this.onGetData(text);
    }
    /**
     * @param {string} specifier 
     * @returns {HTMLElement}
     */
    get(specifier){        
        return document.querySelector(specifier);
    }    
    /**     
     * @param {CustomEvent} e 
     */
    onControllerClick(e){
        //TODO - check Logout html!!!!
        if(this.pageModel.setURL(e.detail + ".html"))
            this.pageModel.message();
    }
    onGetData(text){
        this.innerView.transformInner(text);
    }
    onLandingClick(e){        
        this.scrollView.goTo(this.contentEl.offsetTop);
    }
}

export default Controller;