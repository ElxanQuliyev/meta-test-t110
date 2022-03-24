const express=require('express')
const { languagegetall }=require('../Controller/LanguageController')
const router=express.Router();

router.get('/language/getall',languagegetall)


module.exports={
    routes:router
}