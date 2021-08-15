const express = require('express');
var app = express.Router();
app.group((router)=>{
router.group('/context',require('./context.js'));
router.group('/login',require('./login.js'));
router.group('/user',require('./user.js'));
})
module.exports = app;