const db = require('../db');
const { setDoc, query, collection, where, getDocs } = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError');
const httpStatus = require('http-status');


const languagegetall=async(req,res,next)=>{
    try {
        const data=req.body
        const Languageref=query(collection(db,'Language'),where('is_deleted','==',false))
        const Languages=await getDocs(Languageref)
        const lang=[]
        Languages.forEach(x => {
            const language={
               id:x.id,
               flag:x.data().flag,
               name:x.data().name
            }
            lang.push(language)
        });
    res.send(lang.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }))
    } catch (error) {
        next(new BaseError(httpStatus.BAD_REQUEST,error.message,'LanguageController/languagegetall'))
    }
}

module.exports={
    languagegetall
}