const express = require('express');
var app = express.Router();
const path_u = {
    user : require('./user.js'),
    login : require('./login.js'),
    context : require('./context.js')
}
app.group('/',(router)=>{
    router.group('/user',path_u.user);
    router.group('/login',path_u.login);
    router.group('/context',path_u.context);
})

// var ress = {
//     data:"hangul"
// }
// app.get('/', (req,res)=> {
//     return res.status(200).json(ress)
// })
module.exports = app;