const express=require('express')
const {add, GetByUser}=require('../Controller/FavoryController')
const router=express.Router()


router.post('/add',add)
router.get('/getbyuser/:lang',GetByUser)
module.exports=router