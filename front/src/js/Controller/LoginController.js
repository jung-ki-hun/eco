import Controller from "../_origin/Controller.js";
//Import Models
import LoginModel from "../login/Model/LoginModel.js";
//Import Views
import LoginView from "../login/View/LoginView.js";

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