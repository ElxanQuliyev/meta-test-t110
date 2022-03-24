const db =require('../db');
const helper=require('../Helper/Validation')
const { addDoc, collection,getDocs, query, where, doc, getDoc, updateDoc } = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
    try {
        const data=req.body;
        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        const typesref=query(collection(db,'Category'),where('language','array-contains-any',data.language))
        const types=  await getDocs(typesref)

        types.forEach(x=>{
          throw new Error('Bu adda kateqoriya artiq var')
        })

        let answer=helper.catlanguage(data.language,Languagelist);
        if (!answer) throw new Error('Diller yalnis qeyd olunub')

           if (answer==true) {
            await addDoc(collection(db,'Category'),{
                language:data.language,
                is_deleted:false
            })
           }
           else{
              throw new Error('Adlar düzgün qeyd edilməyib')
           }
        res.send('Kateqoriya əlavə edildi')
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/add'))
    }
}

const update=async(req,res,next)=>{
try {
    const id=req.params.id
    const data=req.body;
    const Languageref=collection(db,'Language')
    const Languagelist= await getDocs(Languageref);
    let answer=helper.catlanguage(data.language,Languagelist);
    if (!answer) {
    throw new Error('Diller yalnis qeyd olunub')
        }
       if (answer==true) {
        await updateDoc(doc(db,'Category',id),{
            language:data.language,
            is_deleted:false
        })
       }
       else{
          throw new Error('Adlar düzgün qeyd edilməyib')
       }
    res.send('Kateqoriya yenilendi')
} catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/update'))
}
}

const remove=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db,'Category',id),{
            is_deleted:true
        })
        res.send('kateqoriya silindi')
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/remove'))
    }
}

const getall=async(req,res,next)=>{
    try {
        const lang=req.params.lang;
        const dataref=query(collection(db,'Category'),where('is_deleted','==',false))
        const data= await getDocs(dataref)
     const categoryList=[]
     data.forEach(z=>{
            const cat={
                id:z.id,
                name:z.data().language.find(y=>y.lang_code==lang).name
            }
            categoryList.push(cat)
     })
     res.status(200).send(categoryList)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/getall'))
    }
}

const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const categoryref= await getDoc(doc(db,'Category',id))
    const data=categoryref.data()
    const category={
        id:categoryref.id,
        language:data.language
    }
    res.send(category)
} catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/GetById'))
}
}

const restore=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db,'Category',id),{
            is_deleted:false
        })
        res.send('Kategoriya geri qaytarildi')
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'CategoryController/restore'))
    }
}

module.exports={
    add,
    remove,
    getall,
    GetById,
    update,
    restore
}