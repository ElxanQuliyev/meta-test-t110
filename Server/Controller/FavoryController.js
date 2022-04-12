const db = require('../db');
const { addDoc, doc, collection,query, where, getDocs, getDoc, documentId } = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError');
const httpstatus = require('http-status');
const Autherize=require('../middlewares/Auth');
const Content=require('../Models/Content')


const add=async(req,res,next)=>{
   try {
       const id=req.body.id
       const token=req.headers['x-access-token']
       let User=await Autherize.authen(token)
       if (User==null) {
           throw new Error('User yoxdur')
        }
        await addDoc(collection(db,'Favory'),{
            user_id:User.id,
            content_id:id,
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
        let User=await Autherize.authen(token)
        if (User==null) {
            throw new Error('User yoxdur')
         }
         const favorylist=[]

         const favoryref=query(collection(db,'Favory'),where('user_id','==',User.id))
         await getDocs(favoryref).then(response=>{
            response.forEach(x=>{
                favorylist.push(
                    {
                       id: x.data().content_id,
                    }
                )
            })
         })
         var contentlist=[];

        await Promise.all(favorylist.map(async (i) => {
                const contents=await getDoc(doc(db,'Content',i.id))
                const content=new Content(contents.id,contents.data(),lang)
                    contentlist.push(content)
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