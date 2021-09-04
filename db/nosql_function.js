const nodb = require('./nosqldb').init();


//schema ~~!!
const command = new nodb.Schema({
    command_id: { type: OdjectId, require: true, unique: true },
    name: { type: String, require: true },
    create_d: { type: Date, require: true },
    contents: { type: String, require: true }
});//뎃글
const context = new nodb.Schema({
    context_id: { type: Number, require: true, unique: true }, //넘버 
    name: { type: String, require: true },
    id: { type: String, require: true },
    create_d: { type: Date, require: true },
    title: { type: String, require: true },
    content: { type: Buffer, require: true },
    command: [command]
});//게시글

//auto-increment 
context.plugin(autoIncrement.plugin, {
    model: context, //
    field: context_id, //증가해야하는 값
    statAt: 1, //시작 카운트
    increment: 1 //증가 값
}) // 자동 카운트

const schema_j = nodb.models('boast', context); //자랑하기 
const schema_q = nodb.models('qnalist', context); //질문하기

module.exports = {
    qna:{
        addboard:(data)=>{},
        deleteboard:()=>{},
        selectboard:()=>{},
        addcommand:()=>{},
        getlistboard:()=>{},
    },
    show:{


    }

}