'use strick'
const firebase=require('../db');
const db=firebase.firestore();
const CinemaLab=require('../Models/CinemaLab');
const Validator=require('validatorjs');
const helper=require('../Helper/Validation');

const getcinema=async(req,res)=>{
    try {
        const id=req.params.id
        const lang=req.params.lang
        const film=await db.collection('Content').doc(id).get()
        const data=film.data();
        const Categories= await db.collection('Category').get()
        const Actors= await db.collection('Actors').get()
        const Directors= await db.collection('Directors').get()
        const ContentType= await db.collection('ContentType').doc(data.ContentTypes).get()
        
        var Con =data.Language
        var CategoriList=[]

         if (data.Type!="Film") {
            throw res.send('bele bir kontent tapilmadi')
        }
        data.Categories.forEach(x=>{
            Categories.forEach(z=>{
                if (z.id==x) {
                    var cate={
                        Id: x.Id,
                        Name: z.data().Language.find(x=>x.LangCode==lang).Name
                        }
               CategoriList.push(cate)
                }
            })
          })

          const Actorlist=[]
            Actors.forEach(z=>{
               const actors= data.Actors.find(a=>a==z.id)[0]
               if (actors !=null) {
                const actor={
                    id:actors,
                    Name:z.data().Name,
                    Picture:z.data().Picture
                }
               Actorlist.push(actor)
               }
            })

            const Directorlist=[]
            Directors.forEach(z=>{
               const directors= data.Directors.find(a=>a==z.id)
               if (directors !=null) {
                const director={
                    id:directors,
                    Name:z.data().Name,
                    Picture:z.data().Picture
                }
               Directorlist.push(director)
               }
            })

        const films=new CinemaLab(
            film.id,
            Con.Name,
            Con.Description,
            CategoriList,
            data.Age,
            Actorlist,
            Directorlist,
            data.AddDate,
            data.MainPicture,
            data.SliderImage,
            data.AddDate,
            data.IsSlider,
            data.IsFeatured,
            data.ContentDate,
            data.ModifiedOn,
            data.Hit,
            data.Type,
            data.IMDB,
            ContentType.data().Language.find(x=>x.LangCode==lang).Name,
            data.Url,
            data.Trailers,
            data.Subtitles,
            data.Audios,
            data.Comments
        )
        //   if (data.Claims!=null){
            //   data.Claims.forEach(c=>{
                //   if (c==user.data().Claims) {
                   throw res.send(films);
                //   }
            //   })
        // }
        res.send("qeydiyyatdan kecmemisiz")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const addcinema=async(req,res)=>{
    try {
        const data=req.body;
        const Categories= await db.collection('Category').get()
        const Actors= await db.collection('Actors').get()
        const Directors= await db.collection('Directors').get()
        const Languages= await db.collection('Language').get()
        const Catalogs=await db.collection('Catalogs').get()
        const Platforms=await db.collection('Platforms').doc(data.Platform).get()
        const ContentTypes=await db.collection('ContentType').doc(data.ContentType).get()
        
        const CatalogList=[]
        Catalogs.forEach(x=>{
            const catalog= data.Catalogs.find(a=> a==x.id)
            if (catalog!=null) {
            CatalogList.push(catalog)
            }
        })
        const CategoriList=[]
        data.Categories.forEach(x=>{
            Categories.forEach(z=>{
                if (z.id==x) {
                 CategoriList.push(x)
                }
            })
        })
        if (CategoriList.length <= 0) {
            throw res.status(400).send("Kateqoriya tapilmadi")
        }
        const Actorlist=[]
          Actors.forEach(x=>{
             const actor= data.Actors.find(a=>a==x.id)
             if (actor!=null) {
             Actorlist.push(actor)
             }
          })
        const Directorlist=[]
        Directors.forEach(x=>{
            const director= data.Directors.find(a=>a==x.id)
            if (director!=null) {
            Directorlist.push(director)
            }
         })
        const LanguageList=[]
        data.Language.forEach(x=>{
            let answer=helper.language(x.LangCode,x.Name,x.Description)
            if (answer==true) {
                const lan= {
                    LangCode:x.LangCode,
                    Name:x.Name,
                    Description:x.Description
                }
                LanguageList.push(lan)
            }else{
                throw res.send('adlar düzgün qeyd edilmeyib')
            }
        })

        let las=0
        Languages.forEach(x=>{
         las++
        })
        if (LanguageList.length!=las) {
            throw res.status(400).send('Bütün dillər qeyd edilməlidir')
        }
        let ages=new Validator({
           ContentDate: data.ContentDate,
           IsSlider:data.IsSlider,
           IsFeatured:data.IsFeatured,
           Type:data.Type,
           MainPicture:data.MainPicture,
           SliderImage:data.SliderImage,
           Claims:data.Claims,
           Time:data.Time
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
            throw res.status(400).send(ages.errors)
        })

         let Audios=[]
        if (data.Audios !=null) {
            Audios=data.Audios
        }
        let Subtitles=[]
        if (data.Subtitles !=null) {
            Subtitles=data.Subtitles
        }

        await db.collection('Content').doc().set({
            Actors:Actorlist,
            Directors:Directorlist,
            Language:LanguageList,
            ContentDate: data.ContentDate,
            Categories:CategoriList,
            Url:data.Url ?? null,
            MainPicture:data.MainPicture,
            SliderImage:data.SliderImage,
            Trailers:data.Trailers ?? [],
            Audios:Audios,
            Subtitles:Subtitles,
            IsSlider:data.IsSlider,
            IsFeatured:data.IsFeatured,
            IsDeleted:false,
            IMDB:data.IMDB,
            AddDate:new Date(),
            Time:data.Time,
            ModifiedOn:new Date(),
            Claims:data.Claims,
            Hit:0,
            Like:0,
            Type:"Film",
            Platform:Platforms.data().Name,
            ContentTypes: ContentTypes.id,
            Price:data.Price ?? null
            })
            res.send(`əlavə olundu`)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatecinema=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=req.body;
        const categoriList=[]
        data.Categories.forEach( x=>{
            categoriList.push(x)
        })
        const Actor=[]
        data.Actors.forEach(x=>{
            const act= {
                Name:x.Name,
                Picture:x.Picture
                }
        let val=new Validator(act,helper.rules)
        val.passes(()=>{
            Actor.push(act)
        })
        val.fails(()=>{
            throw res.send(val.errors);
        })
        })
        const Director=[]
        data.Directors.forEach(x=>{
            const act= {
                Name:x.Name,
                Picture:x.Picture
                }
        let val=new Validator(act,helper.rules)
        val.passes(()=>{
            Director.push(act)
        })
        val.fails(()=>{
            throw res.send(val.errors)
        })
        })
        const Language=[]
        data.Language.forEach(x=>{
            let answer=helper.language(x.LangCode,x.Name,x.Description)
            if (answer==true) {
                const lan= {
                    LangCode:x.LangCode,
                    Name:x.Name,
                    Description:x.Description
                }
                Language.push(lan)
            }else{
                throw res.send('adlar düzgün qeyd edilmeyib')
            }
        })
    
        let ages=new Validator({
           ContentDate: data.ContentDate,
           IsSlider:data.IsSlider,
           IsFeatured:data.IsFeatured,
           IsNew:data.IsNew,
           IsmostView:data.IsmostView,
           IsMostLike:data.IsMostLike,
        },
        {
            ContentDate: 'required',
            IsSlider:'required|boolean',
            IsFeatured:'required|boolean',
            IsNew:'required|boolean',
            IsmostView:'required|boolean',
            IsMostLike:'required|boolean',
        })
    
        ages.fails(()=>{
            throw res.send(new Date())
        })
    
        await db.collection('Content').doc(id).update({
            Actors:Actor,
            Directors:Director,
            Language:Language,
            ContentDate: data.ContentDate,
            Categories:categoriList,
            Url:data.Url,
            Trailers:data.Trailers,
            MainPicture:data.MainPicture,
            SliderImage:data.SliderImage,
            Audios:data.Audios ?? [],
            Subtitles:data.Subtitles,
            IsSlider:data.IsSlider,
            IsFeatured:data.IsFeatured,
            IsDeleted:false,
            IsNew:data.IsNew,
            IsmostView:data.IsmostView,
            IsMostLike:data.IsMostLike,
            AddDate:new Date(),
            ModifiedOn:new Date(),
            Hit:0,
            Type:"CinemaLab"
            })
            res.send('Sinemalab yenilendi')
        } catch (error) {
            res.status(400).send(error.message)
        }
}

module.exports={
    getcinema,
    addcinema,
    updatecinema,
}