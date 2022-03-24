const express=require('express')
const { add, update, getall, remove,GetById, restore } = require('../Controller/SeasonController')

const router= express.Router()

router.post('/add/:id',add)
router.put('/update/:id/',update)
router.get('/getAll/:id',getall)
router.delete('/delete/:id',remove)
router.patch('/restore/:id',restore)
router.get('/getbyid/:id',GetById)

module.exports={
    routes:router
}