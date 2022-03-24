const express=require('express')
const { add }=require('../Controller/PromoController')
const router=express.Router()

router.post('/promo',add)

module.exports={
    routes:router
}