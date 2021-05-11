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
        this.loginView = new LoginView(this.get(".loginWrapper"));        
        //Models
        this.loginModel = new LoginModel();
        //Variables

        //Binding
        this.loginView.hear("@submit", (e)=>this.onSubmit(e.detail));
    }
    /**
     * 
     * @param {Object} d 
     */
    onSubmit(d){
        console.log(d);
    }
}

export default LoginController;