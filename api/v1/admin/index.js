const express = require('express');
var app = express.Router();
app.group((router)=>{
router.group('/chat',require('./chat.js'));
router.group('/login',require('./login.js'));
router.group('/chat',require('./chat.js'));
})
module.exports = app;