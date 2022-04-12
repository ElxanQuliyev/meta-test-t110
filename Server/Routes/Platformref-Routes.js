const express=require('express')
const { add, remove, getplatforms } = require('../Controller/PlatformsrefController')

const router=express.Router()

router.post('/add',add)
router.patch('/delete/:id',remove)
router.get('/:lang/getall',getplatforms)

module.exports={
    routes:router
}