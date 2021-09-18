const express = require('express');
var app = express.Router();
const path_u = {
    link : require('./linking'),
    stream : require('./stream'),
    wiki : require('./wiki'),
    api : require('./api'),
}
app.group('/',(router)=>{
    router.group('/linking',path_u.linking);
    router.group('/stream',path_u.stream);
    router.group('/wiki',path_u.wiki);
    router.group('/api',path_u.api);
})
module.exports = app;