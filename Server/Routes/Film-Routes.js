const express=require('express')
const { add, GetById, update, addcomment, deletecomment, updatecomment, GetByIdLang,uploadImage, deleteMovie }=require('../Controller/FilmController')

const multer  = require('multer');
const { admin } = require('../middlewares/Auth');
// const upload = multer({ dest: 'uploads/' })

const router=express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
    
//         cb(null, './uploads');
//       },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
//   });
//   const uploadImg = multer({storage: storage}).single('image');

const uploadImg = multer({storage: multer.memoryStorage()}).fields([{name:'image',maxCount:1},{name:'backgroundImg',maxCount:1}]);

router.post('/add',uploadImg,add)
router.get('/:lang/getById/:id',GetById)
// router.get('/getByIdAdmin/:id',GetByIdAdmin)

router.get('/:lang/getbyidlang/:id',GetByIdLang)
router.put('/update/:id',uploadImg,update)
router.delete('/delete/:id',admin,deleteMovie)
router.post('/comment/add/:id',addcomment)
router.post('/uploadimage',uploadImg,uploadImage)
router.patch('/comment/delete/:CommentId/:id',deletecomment)
router.put('/comment/update/:CommentId/:id',updatecomment)

module.exports=router
