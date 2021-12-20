//데이터 분석용 
const axios =require('axios');//쓰려나??
const request = require('request');//html page 요청
const cheerio = require("cheerio");//jquery로 변환
const fs = require('fs');

function delay(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve();
        },ms);
    });
}

function getHTML(url) {
    return new Promise(resolve=>{
        delay(300).then(function() {
            axios.get(url).then(function(data) {
                resolve(data);
            });
        });
    })    
}
/// 크롤링

const call_html = () => {
    return new Promise(function(resolve, reject){
        
    })
}
module.exports ={

}