//import Model
import {ModelObj, ModelResult, CreateModel} from "../model/Model.js";

import {View, getView} from "../view/View.js";

interface Controller {
    start() : void,    
}

/**
 * Controller를 설치함
 * @param param0 View
 * @param param1 ModelObj
 * @returns Controller
 */
export function setupController({getEl, emit, on} : View, {getApiPath, getApiInfo, read} : ModelObj) : Controller{
    return {
        start() : void{
            
        }
    }
}