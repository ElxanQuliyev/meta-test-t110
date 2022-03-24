const db = require('../db');
const { addDoc, collection,getDocs, query, where, doc, getDoc, updateDoc } = require('firebase/firestore');
const helper=require('../Helper/Validation');
const BaseError=require('../errorhandle/baseError');
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
    try {
        const data=req.body
        const typesref=query(collection(db,'Catalogs'),where('language','array-contains-any',data.language))
        const types=  await getDocs(typesref)
        types.forEach(x=>{
          throw new Error('Bu adda kataloq artiq var')
        })
        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        let answer=helper.catlanguage(data.language,Languagelist)
        if (!answer) throw new Error('diller yalnis qeyd olunub')
        
        await addDoc(collection(db,'Catalogs'),{
            language:data.language,
            is_deleted:false
        })
    res.send('added')
    } catch (error) {
     next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/add'));
    }
}

const update=async(req,res,next)=>{
    try {
    const id=req.params.id
        const data=req.body
        const Languageref=collection(db,'Language');
        const Languagelist= await getDocs(Languageref);

        let answer=helper.catlanguage(data.language,Languagelist);
        if (!answer) throw new Error('diller yalnis qeyd olunub');
        
        await updateDoc(doc(db,'Catalogs',id),{
            language:data.language,
            is_deleted:false
        })
    res.send('updated')
    } catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/update'))
    }
}

const getall=async(req,res,next)=>{
    try {
    const lang=req.params.lang
    const catalogref=query(collection(db,'Catalogs'),where('is_deleted','==',false))
    const catalogs= await getDocs(catalogref)
    const catalogList=[]
    catalogs.forEach(x=>{
     const catalog={
         id:x.id,
         name:x.data().language.find(a=>a.lang_code==lang).name
     }
     catalogList.push(catalog)
    })
    res.send(catalogList)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/getall'))
    }
}

const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const catalogref= await getDoc(doc(db,'Catalogs',id))
    const data=catalogref.data()
    const catalog={
        id:catalogref.id,
        language:data.language
    }
    res.send(catalog)
} catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/GetById'))
}
}

const remove=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const catalogref=doc(db,'Catalogs',id);
    await updateDoc(catalogref,{
        is_deleted:true
    })
    res.send('deleted')
  } catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/remove'))
  }
}

const restore=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const catalogref=doc(db,'Catalogs',id);
        await updateDoc(catalogref,{
            is_deleted:false
        })
        res.send('restored')
      } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CatalogController/restore'))
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