const express = require('express');
const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');

const test =  (req,res)=>{
    var ress = {
        data:"hi 성덕 hangul"
    }
    return res.status(200).json(ress);
}///xpx

module.exports = (app) => {
      app.get('/test',test);//api/v1/user/context/test
      
  }