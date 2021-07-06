const express = require('express');
var app = express.Router();
app.group((router)=>{
router.group('',require());
})
module.exports = app;