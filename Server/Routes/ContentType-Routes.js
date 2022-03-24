const express=require('express')
const { add, getall, remove, restore, update, GetById }=require('../Controller/ContentTypeController')

const router=express.Router()

router.post('/add',add)
router.get('/getall/:lang',getall)
router.get('/getbyid/:id',GetById)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)
router.patch('/restore/:id',restore)

module.exports=router
