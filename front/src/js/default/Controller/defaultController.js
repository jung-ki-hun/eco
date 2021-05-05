import LoginView from "../View/LoginView.js"

export default {
    start : function(){        
        let loginView = new LoginView(document.querySelector(".controller"));
    }
}