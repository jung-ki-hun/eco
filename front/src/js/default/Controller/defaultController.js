// Import Models

// Import Views
import LoginView from "../View/LoginView.js"

export default {    
    start : function(){        
        let loginView = new LoginView(document.querySelector(".controller"));
        
    },
    /**
     * @param {string} specifier 
     * @returns {HTMLElement}
     */
    get : function(specifier){
        return document.querySelector(specifier);
    }
}