const express = require('express');
var app = express.Router();
app.group((router)=>{
router.group('/user',require('./user.js'));
router.group('/login',require('./login.js'));
router.group('/context',require('./context.js'));
})
module.exports = app;