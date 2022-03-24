const express=require('express')
const {add}=require('../Controller/HistoryController')
const router=express.Router();

router.post('/add',add)

module.exports={routes:router}