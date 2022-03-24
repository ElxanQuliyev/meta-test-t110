const express=require('express')
const {add,getall,update,remove,GetById}=require('../Controller/PlatformController')
const router=express.Router()

router.post('/add',add)
router.get('/getall',getall)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)
router.get('/getbyid/:id',GetById)

module.exports=router