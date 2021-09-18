const nodb = require('./nosqldb').init();
const jkh = require('../api/v1/function/jkh_function');
const autoIncrement = require('mongoose-auto-increment');
//schema ~~!!
const command = new nodb.Schema({
    command_id: { type: Number, require: true, unique: true },
    name: { type: String, require: true },
    create_d: { type: Date, require: true },
    contents: { type: String, require: true }
});//뎃글
const context_j = new nodb.Schema({
    context_id: { type: Number, require: true, unique: true }, //넘버 
    name: { type: String, require: true },
    id: { type: String, require: true },
    create_d: { type: Date, require: true },
    title: { type: String, require: true },
    content: { type: Buffer, require: true },
    command: [command]
});//자랑 게시글
const context_q = new nodb.Schema({
    context_id: { type: Number, require: true, unique: true }, //넘버 
    name: { type: String, require: true },
    id: { type: String, require: true },
    create_d: { type: Date, require: true },
    title: { type: String, require: true },
    content: { type: Buffer, require: true },
    command: [command]
});//질문 게시글

//auto-increment 
context_q.plugin(autoIncrement.plugin, {
    model: 'showlist', //
    field: 'context_id', //증가해야하는 값
    statAt: 1, //시작 카운트
    increment: 1 //증가 값
}) // 자동 카운트
context_j.plugin(autoIncrement.plugin, {
    model: 'qnalist', //
    field: 'context_id', //증가해야하는 값
    statAt: 1, //시작 카운트
    increment: 1 //증가 값
}) // 자동 카운트
const schema_j = nodb.model('showlist', context_j); //자랑하기 
const schema_q = nodb.model('qnalist', context_q); //질문하기
// command.plugin(autoIncrement.plugin, {
//     model: command, //
//     field: command_id, //증가해야하는 값
//     statAt: 1, //시작 카운트
//     increment: 1 //증가 값
// }) // 자동 카운트


module.exports = {
    qna:{
        addboard:async (data)=>{
            const qnacontext = new schema_q(data);
            await qnacontext.save();
        },
        deleteboard:async(data)=>{}, //게시글 삭제 (admin)
        selectboard:async(data)=>{
            nodb.find(1)//조건(offset) 원하는 데이터 정렬 
        }, //게시글 검색
        addcommand:(data) =>{
            
            let command = d;

        }, //뎃글 작성
        getlistboard:(data)=>{
            nodb.find();
        }, //리스트
        getviewboard:(data)=>{
            nodb.find();
        } //게시글 보기
    },
    show:{
        addboard:async (data)=>{
            const qnacontext = new schema_j(data);
            await qnacontext.save();
        },
        deleteboard:async(data)=>{}, //게시글 삭제 (admin)
        selectboard:async(sql,data)=>{
            nodb.find(sql).select(data).sort('context_id')//조건(offset) 원하는 데이터 정렬 
        }, //게시글 검색
        addcommand:(data) =>{
            
            let command = d;

        }, //뎃글 작성
        getlistboard:(data)=>{
            nodb.find();
        }, //리스트
        getviewboard:(data)=>{
            nodb.find();
        } //게시글 보기

    }

}