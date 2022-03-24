const express=require('express')
const { add, getall, remove ,restore, update, GetById }=require('../Controller/ActorsController')

const router=express.Router();

router.post('/add',add)
router.get('/getall',getall)
router.get('/getbyid/:id',GetById)
router.delete('/delete/:id',remove)
router.patch('/restore/:id',restore)
router.put('/update/:id',update)

module.exports=router