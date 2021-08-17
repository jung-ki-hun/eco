const express = require('express');
var app = express.Router();
// app.group((router)=>{
//     router.group('/user',require('./user.js'));
//     router.group('/login',require('./login.js'));
//     router.group('/context',require('./context.js'));
// })

var ress = {
    data:"hi 성덕 hangul"
}
app.get('/', (req,res)=> {
    return res.status(200).json(ress)
})
module.exports = app;