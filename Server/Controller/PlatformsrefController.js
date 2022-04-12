const db=require('../db')
const {query,setDoc,doc, deleteDoc, addDoc,collection,orderBy, getDocs,getDoc,limit ,getDocFromCache,where, updateDoc, documentId, getDocsFromCache, getDocsFromServer, onSnapshot}=require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')

const add=async(req,res,next)=>{
    try {
        const data=req.body
        const platform=data.platform
        const catalog=data.catalog
        const content_type=data.content_type

        const docRef = query(collection(db, 'Content'),where('catalogs','array-contains',catalog),
        where('platform','==',platform)
        ,where('is_deleted','==',false),where('is_featured','==',true),where('content_type','==',content_type)
        ,orderBy('modified_on',"desc"),limit(20))

        const result= await getDocs(docRef).then(response=>{
            if(response.size>6){
                return true
            }
        }).catch(e=>{
           return false
        });

        if (typeof order == 'number' && result) {
            await addDoc(collection(db, "Platformref"), {
                platform:platform,
                content_type:content_type,
                is_deleted:false,
                catalog:catalog,
                modified_on:new Date(),
                order:order
              });
        } else if(!result){
            throw {status:406,message:'Gonderdiyiniz melumatatlara gore minimum 6 eded kontent olmalidir'}
        }
        else{
            throw {status:406,message:'Order reqem olmalidir'}
        }
        res.send('Platforma elave edildi')
    } catch (error) {
       next( new BaseError(error.status,error.message,'Platformref/add'))
    }
}

const update=async(req,res,next)=>{
    try {
        const id=req.body.id
        const data=req.body
        const platform=data.platform
        const catalog=data.catalog
        const content_type=data.content_type

        const docRef = query(collection(db, 'Content'),where('catalogs','array-contains',catalog),
        where('platform','==',platform)
        ,where('is_deleted','==',false),where('is_featured','==',true),where('content_type','==',content_type)
        ,orderBy('modified_on',"desc"),limit(20))

        const result= await getDocs(docRef).then(response=>{
            if(response.size>6){
                return true
            }
        }).catch(e=>{
           return false
        });

        if (typeof order == 'number' && result) {
            await updateDoc(doc(db, "Platformref",id), {
                platform:platform,
                content_type:content_type,
                is_deleted:false,
                catalog:catalog,
                modified_on:new Date(),
                order:order
              });
        } else if(!result){
            throw {status:406,message:'Gonderdiyiniz melumatatlara gore minimum 6 eded kontent olmalidir'}
        }
        else{
            throw {status:406,message:'Order reqem olmalidir'}
        }
        res.send('Platforma elave edildi')
    } catch (error) {
        next( new BaseError(error.status,error.message,'Platformref/update'))
    }
}

const remove=async(req,res,next)=>{
    try {
        const id =req.params.id
        await deleteDoc(doc(db,'Platformref',id))
        res.send('Platforma silindi')
    } catch (error) {
        next(new BaseError(error.status,error.message,'Platformref/remove'))
    }
}

const getplatforms=async(req,res,next)=>{
   try {
    const lang=req.params.lang;

    const platformss =query(collection(db, 'Platformref'),where('is_deleted','==',false),orderBy("modified_on"));
    const catalogs =collection(db, 'Catalogs');
    const ContentRef = collection(db, 'ContentType');
    const platRef = collection(db, 'Platform');

    var platform= await getDocsFromCache(platformss);
    var catalog= await getDocsFromCache(catalogs);
    var ContentTypes= await getDocsFromCache(ContentRef);
    var plat= await getDocsFromCache(platRef);
if (plat.size==0) {
    var platform= await getDocs(platformss).then(response=>{
        onSnapshot(platformss)
        return response
    })
    var catalog= await getDocs(catalogs).then(response=>{
        onSnapshot(catalogs)
        return response
    })
    var ContentTypes= await getDocs(ContentRef).then(response=>{
        onSnapshot(ContentRef)
        return response
    })
    var plat= await getDocs(platRef).then(response=>{
        onSnapshot(platRef)
        return response
    })
    console.log('serverden oxundu');
}
    const platforms=[];
    platform.forEach(x=>{
        let CatalogName=''
        let ContentType=''
        let PlatformName=''

        catalog.forEach(a=>{
            if (a.id==x.data().catalog) {
                CatalogName=a.data().language.find(q=>q.lang_code==lang).name
            }
        })
        plat.forEach(a=>{
            if (a.id==x.data().platform) {
                PlatformName=a.data().name
            }
        })
        ContentTypes.forEach(z=>{
            if (z.id==x.data().content_type) {
                ContentType=z.data().language.find(n=>n.lang_code==lang).name
            }
        })
     const name={
         id:x.id,
         platform:PlatformName,
         platform_id:x.data().platform,
         catalog_id:x.data().catalog,
         catalog_name:CatalogName,
         type_id:x.data().content_type,
         type_name:ContentType,
     }
        platforms.push(name)
    })
    res.send(platforms)
   } catch (error) {
       next(new BaseError(error.status,error.message,'Platformref/get'))
   }
}

module.exports={
    add,
    remove,
    getplatforms,
    update
}