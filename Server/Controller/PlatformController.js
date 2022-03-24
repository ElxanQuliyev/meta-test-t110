const db=require('../db')
const {query,setDoc,doc, addDoc,collection,orderBy, getDocs,getDoc,limit ,getDocFromCache,where, updateDoc, documentId}=require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status');

const add=async(req,res,next)=>{
    try {
        const data=req.body
       const platformref=query(collection(db, "Platform"))
       const platform=await getDocs(platformref)
       if (platform.size!=0) {
           throw new Error('Bu adda platforma artiq var')
       }
            await addDoc(collection(db, "Platform"), {
                name:data.name,
                is_deleted:false,
              });
        res.send('Platforma elave edildi')
    } catch (error) {
        next(new BaseError(httpstatus.FORBIDDEN,error.message,'PlatformController/add'))
    }
}

const getall=async(req,res,next)=>{
    try {
        const body=req.body
           const platformsref= await getDocs(collection(db, "Platform"));
           const platforms=[]
           platformsref.forEach(x=>{
               if (x.data().is_deleted==false) {
                platforms.push({
                    id:x.id,
                    name:x.data().name
                }) 
               }
           })
        res.send(platforms)
    } catch (error) {
        next(new BaseError(httpstatus.FORBIDDEN,error.message,'PlatformController/getall'))
    }
}

const update=async(req,res,next)=>{
try {
    const id=req.params.id
    const data=req.body
    await updateDoc(doc(db, "Platform",id), {
        name:data.name,
      });
res.send('Platforma yenilendi')
} catch (error) {
    next(new BaseError(httpstatus.FORBIDDEN,error.message,'PlatformController/update'))
}
}

const remove=async(req,res,next)=>{
    try {
        const id=req.params.id
        await updateDoc(doc(db, "Platform",id), {
            is_deleted:true,
          });
    res.send('Platforma silindi')
    } catch (error) {
        next(new BaseError(httpstatus.FORBIDDEN,error.message,'PlatformController/update'))
    }
}
const GetById=async(req,res,next)=>{
try {
    const id=req.params.id
    const platformref= await getDoc(doc(db,'Platform',id))
    const platform={
        id:platformref.id,
        name:platformref.data().name
    }
    res.send(platform)
} catch (error) {
    next(new BaseError(httpstatus.FORBIDDEN,error.message,'PlatformController/update'))
}
}

module.exports={
    add,
    getall,
    update,
    remove,
    GetById
}