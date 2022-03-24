const db = require('../db');
const { addDoc, doc, collection,query, where, getDocs, getDoc, documentId } = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError');
const httpstatus = require('http-status');
const Autherize=require('../middlewares/Auth');



const add=async(req,res,next)=>{
   try {
       const id=req.params.id
       const type=req.params.type
       const token=req.headers['x-access-token']
       let userquery=await Autherize.authen(token)
       if (userquery==null) {
           throw new Error('User yoxdur')
        }
        await addDoc(collection(db,'Favory'),{
            userId:userquery.id,
            contentId:id,
            type:type
        })
        res.send('added')
   } catch (error) {
     next(new BaseError(httpstatus.NOT_FOUND,error.message,'FavoryController/add'))
   }
}
const GetByUser=async(req,res,next)=>{
    try {
        const token=req.headers['x-access-token']
        const lang=req.params.lang
        let userquery=await Autherize.authen(token)
        if (userquery==null) {
            throw new Error('User yoxdur')
         }
         const favorylist=[]

         const favoryref=query(collection(db,'Favory'),where('userId','==',userquery.id))
         await getDocs(favoryref).then(response=>{
            response.forEach(x=>{
                favorylist.push(
                    {
                       id: x.data().contentId,
                       type:x.data().type
                    }
                )
            })
         })
         var contentlist=[];

        await Promise.all(favorylist.map(async (i) => {
                if (i.type=='Film') {
                const contents=await getDoc(doc(db,'Content',i.id))
                    contentlist.push({
                        name:contents.data().language.find(a=>a.lang_code==lang).name
                    })
                }
        })
        )
         res.send(contentlist)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FavoryController/GetByUser'))
    }
}


module.exports={
    add,
    GetByUser
}