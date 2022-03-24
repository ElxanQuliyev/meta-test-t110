const express=require('express')
const { addplatform, deleteplatform, getplatforms } = require('../Controller/PlatformsrefController')

const router=express.Router()

router.post('/add',addplatform)
router.patch('/delete/:id',deleteplatform)
router.get('/:lang/getall',getplatforms)

module.exports={
    routes:router
}