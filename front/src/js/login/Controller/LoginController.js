import Controller from "../../_origin/Controller.js";
//Import Models
import LoginModel from "../Model/LoginModel.js";
//Import Views
import LoginView from "../View/LoginView.js";

class LoginController extends Controller{
/* Views */
    /**
     * @type {LoginView}
     */
    loginView = null;
/* Models */
    /**
     * @type {LoginModel}
     */
    loginModel = null;
/* Methods */
    /**
     * @constructor
     */
    constructor(){
        super("LoginController");
        //Views
        
        //Models

        //Variables

        //Binding
    }
}

export default LoginController;