'use strict'
const db =require('../db');
const {query,updateDoc,Timestamp,documentId, collection, getDocs,getDoc,getDocFromCache , where, doc, orderBy, limit,addDoc}=require('firebase/firestore');
const Film=require('../Models/Film');
const Validator=require('validatorjs');
const helper=require('../Helper/Validation');
const Autherize=require('../middlewares/Auth');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')
const { drive } = require("../driveGoogle");

const fs = require('fs');
const path=require('path')

const add=async (req,res,next)=>{
    try {
        const data=req.body;

        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        let answer=helper.language(data.language,Languagelist);
        if (!answer) throw new Error('Diller yalnis qeyd olunub');
        debugger;
        console.log("assass")
        let ages=new Validator({
           ContentDate: data.content_date,
           IsSlider:data.is_slider,
           IsFeatured:data.is_featured,
           MainPicture:data.main_picture,
           SliderImage:data.slider_image,
           Claims:data.claims,
           Time:data.time
        },
        {
            ContentDate: 'required',
            IsSlider:'required|boolean',
            IsFeatured:'required|boolean',
            MainPicture:'required',
            SliderImage:'required',
            Claims:'required',
            Time:'required'
        })
        ages.fails(()=>{
            throw new Error(ages.errors)
        })
        data.trailers.forEach(x=>{
            if ((x.url && x.name)==null) {
                throw new Error('Trailer duzgun qeyd edilmeyib')
            }
        })
          
        await addDoc(collection(db, "Content"),
        {
            actors:data.actors,
            directors:data.directors,
            language:data.language,
            content_date: data.content_date,
            categories:data.categories,
            url:data.url ?? null,
            main_picture:data.main_picture,
            slider_image:data.slider_image,
            trailers:data.trailers ?? [],
            audios:data.audios ?? [],
            subtitles:data.subtitles ?? [],
            is_slider:data.is_slider,
            age:data.age,
            is_featured:data.is_featured,
            is_deleted:false,
            imdb:data.imdb ?? '',
            add_date:Timestamp.fromDate(new Date()),
            time:data.time,
            modified_on:new Date(),
            country:data.country ?? '',
            claims:data.claims,
            catalogs:data.catalogs,
            hit:0,
            type:"Film",
            platform:data.platform,
            content_type: data.content_type ?? '6gH3VOQCR0cLPujldFBR',
            price:data.price ?? 0
            }
        )
            res.send(`əlavə olundu`)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/add'))
    }
}

const update=async(req,res,next)=>{
    try {
        const id=req.params.id
        const data=req.body;

        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        let answer=helper.language(data.language,Languagelist);
        if (!answer) throw new Error('Diller yalnis qeyd olunub');

        let ages=new Validator({
            ContentDate: data.content_date,
            IsSlider:data.is_slider,
            IsFeatured:data.is_featured,
            Type:data.type,
            MainPicture:data.main_picture,
            SliderImage:data.slider_image,
            Claims:data.claims,
            Time:data.time
         },
         {
             ContentDate: 'required',
             IsSlider:'required|boolean',
             IsFeatured:'required|boolean',
             Type:'required|string',
             MainPicture:'required',
             SliderImage:'required',
             Claims:'required',
             Time:'required'
         })
         ages.fails(()=>{
             throw new Error(ages.errors)
         })
          
        await updateDoc(doc(db, "Content",id),
        {
            actors:data.actors,
            directors:data.directors,
            language:data.language,
            content_date: data.content_date,
            categories:data.categories,
            url:data.url ?? null,
            main_picture:data.main_picture,
            slider_image:data.slider_image,
            trailers:data.trailers ?? [],
            audios:data.audios ?? [],
            subtitles:data.subtitles ?? [],
            is_slider:data.is_slider,
            age:data.age,
            is_featured:data.is_featured,
            is_deleted:false,
            imdb:data.imdb ?? null,
            time:data.time,
            modified_on:new Date(),
            claims:data.claims,
            catalogs:data.catalogs,
            platform:data.platform,
            content_type: data.content_type,
            price:data.price ?? 0
            }
        )
            res.send(`Yenilendi`)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/update'))
    }
}

const GetById=async(req,res,next)=>{
    try {
        const id=req.params.id
        const lang=req.params.lang
        let user;
        let Auth=false;
        const token=req.headers['x-access-token']
        let userquery=await Autherize.authen(token)
        if (userquery!=null) {
            user=userquery
            Auth=true
         }
          
        let data;
        try {
            const docRef = await getDocFromCache(doc(db,'Content',id))
            console.log('cacheden oxundu');
            data=docRef.data()
        } catch (error) {
            const docRef = await getDoc(doc(db,'Content',id));
            data=docRef.data()
        }
           
        const categorys = query(collection(db, 'Category'),where(documentId(),'in',data.categories),where('is_deleted','==',false))
        const Categories = await getDocs(categorys);

        const actorsids=query(collection(db, 'Actors'),where(documentId(),'in',data.actors),where('is_deleted','==',false))
        const Actors= await getDocs(actorsids)
        
        const directorsids=query(collection(db, 'Directors'),where(documentId(),'in',data.directors),where('is_deleted','==',false));
        const Directors=  await getDocs(directorsids)

        const contentsids=query(doc(db, 'ContentType',data.content_type));
        const ContentType=  await getDoc(contentsids)

        const platform=await getDoc(doc(db,'Platform',data.platform))
        data.platform=platform.data().name
        var CategoriList=[]
         if (data.type!="Film") {
            throw new Error('bele bir kontent tapilmadi')
           }
            Categories.forEach(z=>{
                    var cate={
                        id: z.id,
                        name: z.data().language.find(x=>x.lang_code==lang).name
                        }
                    CategoriList.push(cate)
            })

          const Actorlist=[]
            Actors.forEach(z=>{
                const actor={
                    id:z.id,
                    name:z.data().name,
                    picture:z.data().picture
                }
               Actorlist.push(actor)
            })

            const Directorlist=[]
            Directors.forEach(z=>{
                const director={
                    id:z.id,
                    name:z.data().name,
                    picture:z.data().picture
                }
               Directorlist.push(director)
            })

        const films= new Film(id,data,CategoriList,Directorlist,Actorlist,ContentType.data(),lang)
        let access=200;

        if (data.Platform=='MetaFlix'){
            if ( user==null) {
                films.url=null
                access=204
            }else if(user.IsBlock){
                films.url=null
                access=203
            }
            else{
            const Claims=user.Claims.includes(data.Claims)
             if (!Claims) {
                films.Url=null
                access=205
             }
            }
        }
        res.send({
             Auth:Auth,
             AccessMessage:access,
             data:films
            })
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/GetById'))
    }
}

const GetByIdLang=async(req,res,next)=>{
    try {
        const id=req.params.id
        const lang=req.params.lang
          
        const docRef = await getDoc(doc(db,'Content',id));
        const data=docRef.data()

        const categorys = query(collection(db, 'Category'),where(documentId(),'in',data.categories),where('is_deleted','==',false))
        const Categories = await getDocs(categorys);

        const actorsids=query(collection(db, 'Actors'),where(documentId(),'in',data.actors),where('is_deleted','==',false))
        const Actors= await getDocs(actorsids)
        
        const directorsids=query(collection(db, 'Directors'),where(documentId(),'in',data.directors),where('is_deleted','==',false));
        const Directors=  await getDocs(directorsids)

        const contentsids=query(doc(db, 'ContentType',data.content_type));
        const ContentType=  await getDoc(contentsids)

        var CategoriList=[]
         if (data.type!="Film") {
            throw new Error('bele bir kontent tapilmadi')
           }
            Categories.forEach(z=>{
                    var cate={
                        id: z.id,
                        name: z.data().language.find(x=>x.lang_code==lang).name
                        }
                    CategoriList.push(cate)
            })

          const Actorlist=[]
            Actors.forEach(z=>{
                const actor={
                    id:z.id,
                    name:z.data().name,
                    picture:z.data().picture
                }
               Actorlist.push(actor)
            })

            const Directorlist=[]
            Directors.forEach(z=>{
                const director={
                    id:z.id,
                    name:z.data().name,
                    picture:z.data().picture
                }
               Directorlist.push(director)
            })

        const films= new Film(id,data,CategoriList,Directorlist,Actorlist,ContentType.data(),lang)
        films.language=data.language
        res.send({
             data:films
            })
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/getbyidlang'))
    }
}

  

const uploadImage = async (req, res, next) => {
    try {
      const imageName = req.file.originalname;
      console.log(imageName)
      // Format the filename
      const timestamp = Date.now();
      const name = imageName.split(".")[0];
      const type = imageName.split(".")[1];
      const fileName = `${name}_${timestamp}.${type}`;
      const file = req.file;
      var fileMetadata = {
        name: `${fileName}`,
        parents: ['1FKgBB80kg4W0P-eIKQy9xO8UOFtREijn'],
      };
      var media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(path.join(file.path)),
      };
      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });
      const fileId = response.data.id;
      drive.permissions.create({
        resource: {
          type: "anyone",
          role: "reader",
        },
        fileId: fileId,
        fields: "id",
      });
      res.send(`https://drive.google.com/uc?export=view&id=${fileId}`);
      fs.unlinkSync(path.join(file.path));
      // report the response from the request
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

const addcomment=async(req,res,next)=>{
try {
    const id=req.params.id;
    const data=req.body;
       let Auth=false;
       let user;
       const token=req.headers['x-access-token']
       let userquery=await Autherize.test(token)
       if (userquery!=null) {
           user=userquery
           Auth=true
        }
    
    const FilmRef=doc(db, 'Content', id)
    const film=await getDoc(FilmRef)

    let comments=[]
    comments= film.data().Comment ?? []
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    if (data.Text==null || data.Text.trim()<1){
        throw new Error('Text bos ola bilmez')
    }
    const Comment={
        id:uuid,
        UserId:decode.id,
        Text:data.Text.trim(),
        ModifiedOn:new Date()
    }
    comments.push(Comment)
    if (user.data().IsBlock) throw res.status(400).send('Siz Blok olunmusunuz')

    await updateDoc(FilmRef,{
        Comment:comments
    })

    res.send(comments)
} catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/addcomment'))
}
}

const deletecomment=async(req,res,next)=>{
try {
    const id=req.params.id;
    const commentid=req.params.CommentId;
    let Auth=false;
    let user;
    const token=req.headers['x-access-token']

    let userquery=await Autherize.authen(token)

    if (userquery!=null) {
        user=userquery
        Auth=true
     }else{
         throw new Error('Siz Qeydiyyatdan kecmemisiz')
     }

    const FilmRef=doc(db, 'Content', id)
    const film=await getDoc(FilmRef)

    let comments= film.data().Comment ?? []

    const del= comments.find(x=>x.id==commentid)
     
    if (user.IsBlock) throw res.status(400).send('Siz Blok olunmusunuz')
    if (del.UserId==user.id) {
        comments=comments.filter(x=>x.id!=del.id)
      }

    await updateDoc(FilmRef,{
        Comment:comments
    })

    res.send(comments)
} catch (error) {
    next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/deletecomment'))
}
}

const updatecomment=async(req,res,next)=>{
    try {
        const commentid=req.params.CommentId;
        const id=req.params.id;
        const data=req.body;
        
        let Auth=false;
        let user;
        const token=req.headers['x-access-token']
    
        let userquery=await Autherize.authen(token)
    
        if (userquery!=null) {
            user=userquery
            Auth=true
         }else{
             throw new Error('Siz Qeydiyyatdan kecmemisiz')
         }
        
        const FilmRef=doc(db, 'Content', id)
        const film=await getDoc(FilmRef)
    
        let comments=[]
        comments= film.data().Comment ?? []
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        if (data.Text==null) {
            throw new Error('Text bos ola bilmez')
        }
        comments.forEach(x=>{
            if (x.id==commentid) {
                if (x.UserId==user.id) {
                    const Comment={
                        id:x.id,
                        UserId:x.UserId,
                        Text:data.Text,
                        ModifiedOn:new Date()
                    }
                  comments.push(Comment)
                }
            }else{
                throw res.status(400).send('Id uygun deyil')
            }
        })
    
        if (user.data().IsBlock) throw new Error('Siz Blok olunmusunuz')
    
        await updateDoc(FilmRef,{
            Comment:comments
        })
    
        res.send(comments)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'FilmController/updatecomment'))
    }
}

module.exports={
    add,
    GetById,
    update,
    addcomment,
    deletecomment,
    updatecomment,
    GetByIdLang,
    uploadImage
}