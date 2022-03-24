const jwt = require('jsonwebtoken');
const firestore = require('../db');
const {doc,getDoc}=require('firebase/firestore');
const httpstatus=require('http-status')
const BaseError=require('../errorhandle/baseError')
const sekretkey= process.env.TOKENSECRET


const admin=async(req,res,next)=>{
try {
    const token=req.headers['x-access-token']
    if (token==null) {
        throw new Error('Giris qadagan edildi')
    }
    try {
    var decode= jwt.verify(token, sekretkey);
    } catch (error) {
        throw new Error('Giris qadagan edildi')
    }

    const docRef = doc(firestore, 'User',decode.id);
    const user=await getDoc(docRef);

    const users={
        id:user.id,
        Email: user.data().Email,
        Name:user.data().Name,
        Surname:user.data().Surname,
        Roles:user.data().Claims,
        Phonenumber:user.data().Phonenumber,
        Claims:user.data().Claims
      }
      if (!users.Claims.includes('Admin')){
         throw new Error('Giris qadagan edildi')
      }
      next();
} catch (error) {
    next(new BaseError(httpstatus.CONFLICT,error.message,'Catalogservice/create'))
}
}

let authen = async function(token){
    try {
        const decode= jwt.verify(token, sekretkey);
        const docRef = doc(firestore, 'User',decode.id);
        const user=await getDoc(docRef);
        const users={
          id:user.id,
          Email: user.data().Email,
          Name:user.data().Name,
          Surname:user.data().Surname,
          Phonenumber:user.data().Phonenumber,
          Claims:user.data().Claims,
          IsBlock:user.data().IsBlock,
          ConfirmEmail:user.data().ConfirmEmail
        }
        return users
    } catch (error) {
        return  null
    }
 };

module.exports={admin,authen}