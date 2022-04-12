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
        email: user.data().email,
        name:user.data().name,
        surname:user.data().surname,
        roles:user.data().claims,
        phonenumber:user.data().phonenumber,
        claims:user.data().claims,
        is_admin:user.data().is_admin
      }
      if (!users.claims.includes('Admin')){
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
          email: user.data().email,
          name:user.data().name,
          surname:user.data().surname,
          phonenumber:user.data().phonenumber,
          claims:user.data().claims,
          is_block:user.data().is_block,
          confirm_email:user.data().confirm_email
        }
        return users
    } catch (error) {
        return  null
    }
 };

module.exports={admin,authen}