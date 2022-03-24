const express=require('express')
const { add, GetById, update, addcomment, deletecomment, updatecomment, GetByIdLang, uploadImage }=require('../Controller/FilmController')

const multer  = require('multer')

const router=express.Router();

const driveStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: driveStorage}).single('image');
router.post('/add',add)
router.get('/:lang/getById/:id',GetById)
router.get('/:lang/getbyidlang/:id',GetByIdLang)
router.put('/update/:id',update)
router.post('/comment/add/:id',addcomment)
router.post('/uploadImage',uploadImg,uploadImage)
router.patch('/comment/delete/:CommentId/:id',deletecomment)
router.put('/comment/update/:CommentId/:id',updatecomment)

module.exports=router
