const express=require('express')
const { add, getall, remove, update, restore, GetById }=require('../Controller/DirectorsController')

const router=express.Router();

router.post('/add',add)
router.get('/getall',getall)
router.get('/getbyid/:id',GetById)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)
router.patch('/restore/:id',restore)

module.exports=router