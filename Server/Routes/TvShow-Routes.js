const express=require('express')
const { GetById, add, update,GetByIdLang }=require('../Controller/TvShowController')

const router=express.Router();

router.get('/getbyid/:lang/:id',GetById)
router.post('/add',add)
router.put('/update/:id',update)
router.get('/getbyidlang/:lang/:id',GetByIdLang)

module.exports={router}