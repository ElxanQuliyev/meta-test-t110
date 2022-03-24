const express=require('express')
const { add, remove,GetById, getall, update, restore }=require('../Controller/CategoryController')
const router=express.Router();

router.post('/add',add)
router.delete('/delete/:id',remove)
router.get('/getall/:lang',getall)
router.get('/getbyid/:id',GetById)
router.put('/update/:id',update)
router.patch('/restore/:id',restore)

module.exports=router
