// Import Models
import PageModel from "../Model/PageModel.js";
// Import Views
import HeaderView from "../View/HeaderView.js";
import InnerView from "../View/InnerView.js";
import ScrollView from "../View/ScrollView.js";

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
/* Models */
    /**
     * @type {PageModel}
     */
    pageModel = null
    /**
     * @constructor
     */
    constructor(){                
        //Views
        this.headerView = new HeaderView(this.get("header.top"));
        this.innerView = new InnerView(this.get("div.middle .inner"));        
        this.scrollView = new ScrollView(window);
        //Models
        this.pageModel = new PageModel();                

        //Binding
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
}

export default Controller;