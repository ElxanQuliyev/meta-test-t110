const db = require('../db');
const { collection,addDoc ,updateDoc,doc, query, where, getDocs, getDoc} = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
    try {
        const data=req.body;
        await addDoc(collection(db, "Directors"),{
            name:data.name,
            picture:data.picture,
            is_deleted:false
        })
        res.status(200).send('added')
      } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/add'))
      }
}

const remove=async(req,res,next)=>{
    try {
        const id=req.params.id
        const directorref=doc(db,'Directors',id)
        await  updateDoc(directorref,{is_deleted:true})
        res.send('deleted')
     } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/remove'))
     }
}

const restore=async(req,res,next)=>{
    try {
        const id=req.params.id
        const directorref=doc(db,'Directors',id)
        await  updateDoc(directorref,{is_deleted:false})
        res.send('restored')
     } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/restore'))
     }
}

const getall=async(req,res,next)=>{
    try {
        const directorsref=query(collection(db,'Directors'),where('is_deleted','==',false))
        const actors= await getDocs(directorsref);
        const directorlist=[]
        actors.forEach(x=>{
              const actor={
                  id:x.id,
                  name:x.data().name,
                  picture:x.data().picture
              }
              directorlist.push(actor)
        })
        res.status(200).send(directorlist)
     } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/getall'))
     }
}

const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const directorref= await getDoc(doc(db,'Directors',id))
    const data=directorref.data()
    const directors={
        id:directorref.id,
       name: data.name,
       picture:data.picture
    }
    res.send(directors)
} catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/GetById'))
}
}

const update=async(req,res,next)=>{
    try {
        const id=req.params.id
        const data=req.body
        const directorref=doc(db,'Directors',id)
        await updateDoc(directorref,{
            name:data.name,
            picture:data.picture
        })
        res.status(200).send('updated')
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'DirectorController/update'))
    }
}

module.exports={
    add,
    remove,
    getall,
    update,
    restore,
    GetById
}