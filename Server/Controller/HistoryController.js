const db=require('../db')
const { addDoc, collection,query, updateDoc, doc, setDoc, getDoc, where, getDocs }=require('firebase/firestore')
const {authen}=require('../middlewares/Auth')
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')
const Content=require('../Models/Content')


const add=async(req,res,next)=>{
 try {
    const token=req.headers['x-access-token']
    const data=req.body
    const id=data.id
    let seasonId;
    let tvshowid;
    const User= await authen(token)
    if (User==null) {
       throw {status:httpstatus.UNAUTHORIZED,message:'User yoxdur'}
    }

    if (data.type=='Series'){
      const contentref= query(collection(db,'History'),where('user_id','==',User.id),
      where('series_id','==',data.id))
      const content=await getDocs(contentref)
      if (content.size!=0){
          let historyId;
          content.forEach(x=>{
             historyId= x.id
         })
 
          await updateDoc(doc(db,'History',historyId),{
             time:data.time
          })
         }else{
            const Seasonref=query(collection(db,'Season'),where('series','array-contains',id))
            await getDocs(Seasonref).then(response=>{
               response.forEach(x=>{
                   seasonId=x.id
               })
            })
            const tvshowref=query(collection(db,'Content'),where('seasons','array-contains',seasonId))
            await getDocs(tvshowref).then(response=>{
               response.forEach(x=>{
                 tvshowid=x.id
               })
            })
            await addDoc(collection(db,'History'),{
               user_id:User.id,
               content_id:tvshowid,
               series_id:data.id,
               season_id:seasonId,
               type:data.type,
               time:data.time
               })
         }
    }
    else if (data.type=='Film') {
      const contentref= query(collection(db,'History'),where('user_id','==',User.id),
      where('content_id','==',data.id))
      const content=await getDocs(contentref)
      if (content.size!=0){
          let historyId;
          content.forEach(x=>{
             historyId= x.id
         })
 
          await updateDoc(doc(db,'History',historyId),{
             time:data.time
          })
      }else{
         await addDoc(collection(db,'History'),{
          user_id:User.id,
          content_id:data.id,
          type:data.type,
          time:data.time
          })
      }
    }
   res.send('added')
 } catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'HistoryController/add'))
 }
}

const GetByUser=async(req,res,next)=>{
 try {
    const lang=req.params.lang
   const token=req.headers['x-access-token']
   const data=req.body
   const User= await authen(token)
   if (User==null) {
      throw new Error('siz qeydiyyatdan kecmemisiz')
   }
   const history=[]
   const historyref=query(collection(db,'History'),where("user_id",'==',User.id))
   await getDocs(historyref).then(response=>{
      response.forEach(x=>{
        history.push(x.data())
      })
   })
  const contentlist=[]
  await Promise.all( 
      history.map(async (x)=>{
         const contents=await getDoc(doc(db,'Content',x.content_id))
       if (x.type=='Film') {
         contentlist.push({
            id:contents.id,
            name:contents.data().language.find(a=>a.lang_code==lang).name,
            description:contents.data().language.find(a=>a.lang_code==lang).description,
            type:contents.data().type,
            trailers:contents.data().trailers,
            main_picture:contents.data().main_picture,
            slider_image:contents.data().slider_image,
            url:contents.data().url
         })
      }else if(x.type=='Series'){
         const Serie=await getDoc(doc(db,'Series',x.series_id))
         const Season=await getDoc(doc(db,'Season',x.season_id))
         contentlist.push({
            id:contents.id,
            name:contents.data().language.find(a=>a.lang_code==lang).name+' '+Season.data().language.find(a=>a.lang_code==lang).name+' '+Serie.data().language.find(a=>a.lang_code==lang).name,
            description:Serie.data().language.find(a=>a.lang_code==lang).description,
            type:contents.data().type,
            trailers:Serie.data().trailers,
            main_picture:Serie.data().main_picture,
            slider_image:contents.data().slider_image,
            url:Serie.data().url
         })
      }
      })
   )
   res.send(contentlist)
 } catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'HistoryController/GetByUser'))
 }
}

module.exports={add,GetByUser}