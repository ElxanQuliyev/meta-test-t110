const express=require('express')
const { getcinema, addcinema, updatecinema }=require('../Controller/CinemaLabController');

const router=express.Router()

router.get('/getById/:lang/:id',getcinema)
router.post('/add',addcinema)
router.put('/update/:id',updatecinema)

module.exports={
    routes:router
}