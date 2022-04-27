const db=require('../db')
const Content=require('../Models/Content')
const {query, collection,orderBy, getDocs,doc,updateDoc, where}=require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus = require('http-status');


const allContents=async(req,res,next)=>{
    try {
        const lang=req.params.lang
        const contentsref = query(collection(db, 'Content'),where('is_deleted','==',false),orderBy("modified_on"));
        const contents= await getDocs(contentsref)

        const contentList=[]
        contents.forEach(x=>{
          const con=new Content(x.id,x.data(),lang)
          contentList.push(con)
        })
        res.send(contentList)
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentController/allContents'))
    }
}

const deleteContent=async(req,res,next)=>{
     try {
        const id=req.params.id
        await updateDoc(doc(db,'Content',id),{IsDeleted:true})
        res.send('Kontent silindi')
     } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentController/deleteContent'))
     }
}

const restoreContent=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db,'Content',id),{IsDeleted:false})
        res.send('Kontent geri qaytarildi')
     } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ContentController/restoreContent'))
     }
}

module.exports={
    allContents,
    deleteContent,
    restoreContent
}