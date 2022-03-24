const express=require('express')
const { addstudent, getstudent }=require('../Controller/StudentController')

const router=express.Router()

router.post('/student/add',addstudent)
router.get('/student/get',getstudent)

module.exports={
    routes:router
}