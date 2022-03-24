const db = require('../db');
const { collection,addDoc ,updateDoc,doc, query, where, getDocs, getDoc} = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError');
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
  try {
    const data=req.body;
    await addDoc(collection(db, "Actors"),{
        name:data.name,
        picture:data.picture,
        is_deleted:false
    })
    res.send('added')
  } catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/add'))
  }
}

const remove=async(req,res,next)=>{
 try {
    const id=req.params.id
    const actorref=doc(db,'Actors',id)
    await  updateDoc(actorref,{is_deleted:true})
    res.status(200).send('deleted')
 } catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/remove'))
 }
}

const restore=async(req,res,next)=>{
    try {
       const id=req.params.id
       const actorref=doc(db,'Actors',id)
       await  updateDoc(actorref,{is_deleted:false})
       res.status(200).send('restored')
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/restore'))
    }
}

const getall=async(req,res,next)=>{
   try {
      const actorref=query(collection(db,'Actors'),where('is_deleted','==',false))
      const actors= await getDocs(actorref);
      const actorlist=[]
      actors.forEach(x=>{
            const actor={
                id:x.id,
                name:x.data().name,
                picture:x.data().picture
            }
            actorlist.push(actor)
      })
      res.status(200).send(actorlist)
   } catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/getall'))
   }
}

const update=async(req,res,next)=>{
try {
    const id=req.params.id
    const data=req.body
    const actorref=doc(db,'Actors',id)
    await updateDoc(actorref,{
        name:data.name,
        picture:data.picture
    })
    res.status(200).send('updated')
} catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/update'))
}
}

const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const actorref= await getDoc(doc(db,'Actors',id))
    const data=actorref.data()
    const actor={
     id:actorref.id,
     name:data.name,
     picture:data.picture
    }
    res.send(actor)
} catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'ActorsController/GetById'))
}
}

module.exports={
    add,
    remove,
    getall,
    restore,
    update,
    GetById
}