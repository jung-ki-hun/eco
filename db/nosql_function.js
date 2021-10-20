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
        deleteboard:async(data)=>{

            schema_q.delete(data);
        }, //게시글 삭제 (admin)
        selectboard:async(data)=>{
            schema_q.find(data);//조건(offset) 원하는 데이터 정렬 
        }, //특정 게시글 검색
        addcommand:(data,command) =>{
            
            let command = d;
            schema_q.update(data,command,false,); //조건/ 값/ 이런형태의값을 새로만들것인가?/
        }, //뎃글 작성
        getlistboard:(offset)=>{
            //offset last value                    
            let number = offset -99; // 백단위로 만들어서 줌
            //1-100 101-200 201-300
            schema_q.find({"context_id":{$gt:number,$lt:offset}}).pretty();//범위값
        }, //리스트
        getviewboard:(data)=>{
            schema_q.find(data);
        } //게시글 보기
    },
    show:{
        addboard:async (data)=>{

            const qnacontext = new schema_j(data);
            await qnacontext.save();
        },
        deleteboard:async(data)=>{

            schema_j.delete(data);
        }, //게시글 삭제 (admin)
        selectboard:async(data)=>{
            schema_j.find(data);//조건(offset) 원하는 데이터 정렬 
        }, //특정 게시글 검색
        addcommand:(data,command) =>{
            
            let command = d;
            schema_j.update(data,command,false,); //조건/ 값/ 이런형태의값을 새로만들것인가?/
        }, //뎃글 작성
        getlistboard:(offset)=>{
            //offset last value                    
            let number = offset -99; // 백단위로 만들어서 줌
            //1-100 101-200 201-300
            schema_j.find({"context_id":{$gt:number,$lt:offset}}).pretty();//범위값
        }, //리스트
        getviewboard:(data)=>{
            schema_j.find(data);
        } //게시글 보기
    }

}