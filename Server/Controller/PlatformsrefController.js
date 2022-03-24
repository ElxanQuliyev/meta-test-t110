const db=require('../db')
const {query,setDoc,doc, addDoc,collection,orderBy, getDocs,getDoc,limit ,getDocFromCache,where, updateDoc, documentId}=require('firebase/firestore');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')

const addplatform=async(req,res)=>{
    try {
        const body=req.body
        if (typeof body.Order == 'number') {
            await addDoc(collection(db, "Platforms"), {
                Name:body.Name,
                ContentType:body.ContentType,
                IsDeleted:false,
                Catalog:body.Catalog,
                ModifiedOn:new Date(),
                Order:body.Order
              });
        }else{
            res.status(400).send('Order reqem olmalidir')
        }

        res.send('Platforma elave edildi')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateplatform=async(req,res)=>{
    try {
        const id=req.body.id
        const body=req.body
        if (typeof body.Order == 'number') {
            await updateDoc(doc(db, "Platforms",id), {
                Name:body.Name,
                ContentType:body.ContentType,
                IsDeleted:false,
                Catalog:body.Catalog,
                ModifiedOn:new Date(),
                Order:body.Order
              });
        }else{
            res.status(400).send('Order reqem olmalidir')
        }

        res.send('Platforma elave edildi')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteplatform=async(req,res)=>{
    try {
        const id =req.params.id
        await db.collection('Platforms').doc(id).update({IsDeleted:true})
        res.send('Platforma silindi')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getplatforms=async(req,res)=>{
   try {
    const lang=req.params.lang;

    const platformss =query(collection(db, 'Platforms'),where('IsDeleted','==',false),orderBy("Order"));
    const platform= await getDocs(platformss);

    const catalogs =collection(db, 'Catalogs');
    const catalog= await getDocs(catalogs);

    const ContentRef = collection(db, 'ContentType');
    const ContentTypes= await getDocs(ContentRef);

    const platforms=[];
    platform.forEach(x=>{
        let CatalogName=''
        let ContentType=''
        catalog.forEach(a=>{
            if (a.id==x.data().Catalog) {
                CatalogName=a.data().Language.find(q=>q.LangCode==lang).Name
            }
        })
        ContentTypes.forEach(z=>{
            if (z.id==x.data().ContentType) {
                ContentType=z.data().Language.find(n=>n.LangCode==lang).Name
            }
        })
     const name={
         id:x.id,
         platform:x.data().Name,
         catalog_id:x.data().Catalog,
         catalog_name:CatalogName,
         type_id:x.data().ContentType,
         type_name:ContentType
     }
        platforms.push(name)
    })
    res.send(platforms)
   } catch (error) {
       res.status(400).send(error.message)
   }
}

module.exports={
    addplatform,
    deleteplatform,
    getplatforms,
    updateplatform
}