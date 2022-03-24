const db=require('../db')
const { addDoc, collection,getDocs, query, where, doc, getDoc, updateDoc } = require('firebase/firestore');
const helper=require('../Helper/Validation')
const BaseError=require('../errorhandle/baseError')
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
    try {
      const data=req.body;
      const typesref=query(collection(db,'ContentType'),where('language','array-contains-any',data.language))
      const types=  await getDocs(typesref)

      types.forEach(x=>{
        throw new Error('Bu adda KontentType artiq var')
      })
      const Languageref=collection(db,'Language');
      const Languagelist= await getDocs(Languageref);

      let languageanswer=helper.catlanguage(data.language,Languagelist)
      if (!languageanswer) throw new Error('diller yalnis qeyd olunub')

     await addDoc(collection(db,'ContentType'),{
      language:data.language,
      is_deleted:false
    })
    res.send('added')
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/add'))
    }
}

const getall=async(req,res,next)=>{
   try {
       const lang=req.params.lang
      const typesref=query(collection(db,'ContentType'),where('is_deleted','==',false))
      const types=  await getDocs(typesref)
       const typelist=[]
       types.forEach(x=>{
        const type={
            id:x.id,
            name:x.data().language.find(a=>a.lang_code==lang).name
        }
        typelist.push(type)
       })
       res.send(typelist)
   } catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/getall'))
}
}

const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const typeref=await getDoc(doc(db,'ContentType',id))
    const data=typeref.data()
    const type={
        id:typeref.id,
        language:data.language
    }
    res.send(type)
} catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/GetById'))
}
}

const update=async(req,res,next)=>{
    try {
        const data=req.body;
        const id=req.params.id;

        const Languageref=collection(db,'Language');
        const Languagelist= await getDocs(Languageref);
  
        let languageanswer=helper.catlanguage(data.language,Languagelist)
        if (!languageanswer) throw new Error('diller yalnis qeyd olunub')
  
       await updateDoc(doc(db,'ContentType',id),{
        language:data.language,
      })
      res.send('Updated')
      } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/update'))
      }
}

const remove=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db,'ContentType',id),{is_deleted:true})
        res.send('Silindi')
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/remove'))
    }
}

const restore=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db,'ContentType',id),{is_deleted:false})
        res.send('Geri qaytarildi')
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentTypeController/restore'))
    }
}
module.exports={
  add,
  getall,
  remove,
  restore,
  update,
  GetById
}