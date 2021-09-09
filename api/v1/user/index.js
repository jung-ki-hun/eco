const express = require('express');
var app = express.Router();
const path_u = {
    user : require('./user.js'),
    login : require('./login.js'),
    contextq : require('./context_q.js'),
    contextj : require('./context_j.js'),
}
app.group('/',(router)=>{
    router.group('/user',path_u.user);
    router.group('/login',path_u.login);
    router.group('/context_j',path_u.contextj);
    router.group('/context_q',path_u.contextq);
})
module.exports = app;