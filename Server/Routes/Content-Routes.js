const express=require('express')
const { allContents, deleteContent, restoreContent }=require('../Controller/ContentController')

const router= express.Router()

router.get('/getall/:lang',allContents)
router.patch('/delete/:id',deleteContent)
router.patch('/restore/:id',restoreContent)
module.exports={
    routes: router
}