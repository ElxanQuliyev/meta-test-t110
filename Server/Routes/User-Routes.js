const express=require('express')
const cookieParser=require('cookie-parser')
const app = express()
const {addUser,getAllUser,login, getuser, verifyuser}=require('../Controller/UserController');
app.use(cookieParser());


const router=app

router.post('/adduser',addUser);
router.get('/getalluser', getAllUser);
router.post('/login', login);
router.get('/get',getuser);
router.get('/:email/verify',verifyuser);

module.exports = {
    routes: router
}