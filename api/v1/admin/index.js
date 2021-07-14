const express = require('express');
var app = express.Router();
app.group((router)=>{
router.group('/chat',require('./chat.js'));
router.group('/login',require('./login.js'));
router.group('/passport',require('./passport.js'));
router.group('/api_open',require('./api_open.js'));
})
module.exports = app;