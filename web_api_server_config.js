module.exports = {
    apps:[{
        name:'app',
        script:'./app.js',
        instances: 2,//코어 수 0은 제한 없음 ///추가설정 예정
        exec_mode:'cluster'
    }]
}