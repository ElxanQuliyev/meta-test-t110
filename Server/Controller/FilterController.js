const db=require('../db')
const Content=require('../Models/Content')
const { query,collection,onSnapshot ,orderBy, getDocs,limit,getDocsFromCache,where}=require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')


const filterPlatform=async(req,res,next)=>{
    try {
      const catalog=req.params.catalog
      const lang=req.params.lang
      const contentType=req.params.type
      const platform=req.params.platform
      console.log(catalog)
      const docRef = query(collection(db, 'Content'),where('catalogs','array-contains',catalog),
      where('platform','==',platform)
      ,where('is_deleted','==',false),where('is_featured','==',true),where('content_type','==',contentType)
      ,orderBy('modified_on',"desc"),limit(20))
      let content;
  
      const cache=  await getDocsFromCache(docRef).then(response=>{
        console.log('cache-den oxundu')
          return response
        }).catch(e=>{
           return null
        });
     
      if (cache.size==0) {
          content = await getDocs(docRef);
          onSnapshot(docRef,()=>{console.log('Snapshot isleyir')});
         }else{
            content= cache
         }
      contentList=[]
      content.forEach(x=>{
        const con=new Content(x.id,x.data(),lang)
        contentList.push(con)
      })
      if (contentList.length==0) {
        throw new Error('Sorguya gore melumat tapilmadi')
      }
      res.send(contentList)
    } catch (error) {
      next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilterController/filterPlatform'))
    }
}

const pricefilter=async(req,res,next)=>{
    try {
        const contents=query(collection(db, 'Content'),where('is_price','==',true),where('is_deleted','==',false),orderBy('ModifiedOn',"desc"),limit(20));
        const data= await getDocs(contents);
        const lang=req.params.lang
        const sliderList=[]
        data.forEach(x=>{
                 const con=new Content(
                    x.id,
                    x.data(),lang
                 )
                 sliderList.push(con)
        })
        res.send(sliderList)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilterController/pricefilter'))
    }
}

const filter=async(req,res,next)=>{
    try {
        const catalog=req.params.catalog
        const lang=req.params.lang
        const contents=query(collection(db, 'Content'),where('catalogs',"array-contains",catalog),where('is_deleted','==',false),orderBy("modified_on",'desc'),limit(20));
        let content= await getDocs(contents);
        contentList=[]
        content.forEach(x=>{
                          const con=new Content(x.id,x.data(),lang)
                          contentList.push(con)
        })
        res.send(contentList)
      } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'FilterController/filter'))
      }
}

const filterslider=async(req,res,next)=>{
    try {
        const contents=query(collection(db, 'Content'),where('is_slider','==',true),where('is_deleted','==',false),orderBy('modified_on','desc'),limit(20));
        const data= await getDocs(contents);
        const lang=req.params.lang
        const sliderList=[]
        data.forEach(x=>{
                 const con=new Content(x.id,x.data(),lang)
                 sliderList.push(con)
        })
        res.send(sliderList)
    } catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'FilterController/filterslider'))
    }
}

const search=async(req,res,next)=>{
try {
  const data=req.params.name
  console.log(data.split(''))
  const contentref= query(collection(db,'Content'));
  const contents=await getDocs(contentref)
  const test=[]
  contents.forEach(x => {
  });
  res.send(test)
} catch (error) {
  res.send(error.message)
}
}

module.exports={
filter,
filterPlatform,
filterslider,
pricefilter,
search
}