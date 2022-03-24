const db=require('../db')
const { addDoc, collection,query, updateDoc, doc, setDoc, getDoc, where, getDocs }=require('firebase/firestore')
const {authen}=require('../middlewares/Auth')
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')


const add=async(req,res,next)=>{
 try {
    const token=req.headers['x-access-token']
    const data=req.body
    const User= await authen(token)
    if (User==null) {
       throw next()
    }
    let Language;
    let Trailers;
    let MainPicture;
    if (data.type=='Series'){
       const serie= await getDoc(doc(db,'Series',data.id))
       Language=serie.data().Language
       Trailers=serie.data().Trailers
       MainPicture=serie.data().MainPicture
        console.log('series')
    }else if (data.type=='Film') {
       const film= await getDoc(doc(db,'Content',data.id))
       Language=film.data().Language
       Trailers=film.data().Trailers
       MainPicture=film.data().MainPicture
        console.log('film')
    }

     const contentref= query(collection(db,'History'),where('UserId','==',User.id),
     where('ContentId','==',data.id),where('ContentType','==',data.type))
     const content=await getDocs(contentref);

     if (content.size!=0){
         let historyId;
         content.forEach(x=>{
            historyId= x.id
        })

         await updateDoc(doc(db,'History',historyId),{
            UserId:User.id,
            Language:Language,
            Trailers:Trailers,
            ContentType:data.type,
            MainPicture:MainPicture,
            Time:data.time,
            ModifiedOn:Date.now()
         })
     }else{
        await addDoc(collection(db,'History'),{
            UserId:User.id,
            Language:Language,
            Trailers:Trailers,
            ContentType:data.type,
            MainPicture:MainPicture,
            Time:data.time,
            ModifiedOn:Date.now()
         })
     }
    res.send(content.size.toString())
 } catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'HistoryController/add'))
 }
}


module.exports={add}