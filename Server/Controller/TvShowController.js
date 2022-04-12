const db=require('../db')
const { getFirestore,query,Timestamp, collection,getDoc,documentId, getDocs,doc, where, updateDoc, addDoc, getDocFromCache }=require('firebase/firestore');
const TwShow=require('../Models/twShow')
const Validator=require('validatorjs');
const Autherize=require('../middlewares/Auth');
const helper=require('../Helper/Validation')
const Serie=require('../Models/Series')
const Season=require('../Models/Season')
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')

const GetById=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const lang=req.params.lang;
        let user;
        var Auth=false;
        let status=200;
        const token=req.headers['x-access-token'];
        let userquery=await Autherize.authen(token);
        if (userquery!=null) {
            user=userquery
            Auth=true
         }
         let snap;
         try {
            snap = await getDocFromCache(doc(db, "Content",id));
         console.log('cacheden oxundu');
         } catch (error) {
         snap = await getDoc(doc(db, "Content",id));
         }

        let data=snap.data();
         let seriesid=[];
         // References
         const Seasons=[]
        const snapseason=query(collection(db, "Season"),where('tvShowId','==',snap.id),where('is_deleted','==',false));
        const Seasonsref = await getDocs(snapseason).then(response=>{
            response.forEach(x=>{
            Seasons.push(x)
            })
            return response
        })

        // const snapseries = query(collection(db, "Series"),where(documentId(),'in',seriesid),where('IsDeleted','==',false));
        // const Series = await getDocs(snapseries);

        const categoryids = query(collection(db, 'Category'),where(documentId(),'in',data.categories),where('is_deleted','==',false))
        const category = await getDocs(categoryids);

        const actorref = query(collection(db, 'Actor'),where(documentId(),'in',data.actors),where('is_deleted','==',false))
        const Actors = await getDocs(actorref);
        
        const directorsids=query(collection(db, 'Directors'),where(documentId(),'in',data.directors),where('is_deleted','==',false));
        const Directors=  await getDocs(directorsids);
        // console.log(category.size+Actors.size+Directors.size+Seasonsref.size)

        const twshower=[]

        await Promise.all(Seasons.map(async (i) => {
            const season=new Season(i.id,i.data())
            if (i.data().series.length!=0) {
                const snapseries = query(collection(db, "Series"),where(documentId(),'in',i.data().series),where('is_deleted','==',false));
                await getDocs(snapseries).then(response=>{

                 response.forEach(a=>{
                    const series=new Serie(a.id,a.data(),z.Name,lang)
                    switch (data.claims){
                        case "Free":
                            if (user==null) {
                                status=300
                                series.url=null
                            }else if(user.IsBlock){
                                status=303
                                series.url=null
                            }else if(!user.ConfirmEmail){
                                status=304
                                series.url=null
                            }
                            break;
                        case "Subscriber" || "Pro":
                            if (user==null) {
                                status=300
                                series.url=null
                            }else if(user.IsBlock){
                                status=303
                                series.url=null
                            }else if(!user.ConfirmEmail){
                                status=304
                                series.url=null
                            }else if(!user.Claims.includes(data.Claims)){
                                status=301
                                series.url=null
                            }
                            break;
                        default:
                            break;
                    }
                    season.series.push(series)
                 })
                });
            }
            twshower.push(season)
    }))
            const show=new TwShow(
                snap.id,
                data,
                category,
                Actors,
                Directors,
                twshower,
                lang
            )
         res.send({status:status,auth:Auth,data:show})
    }
    catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'TvShowController/GetById'))
    }
}

const GetByIdLang=async(req,res,next)=>{
    try {
        const id=req.params.id
        const lang=req.params.lang
        let user;
        let Auth;
        const token=req.headers['x-access-token']
        let userquery=await Autherize.authen(token)
        if (userquery!=null) {
            user=userquery
            Auth=true
         }

        const userref=collection(db,'User');
        const comentuser=await getDocs(userref);

        const snap = await getDoc(doc(db, "Content",id));
        let data=snap.data();
         let seriesid=[];
         data.Seasons.forEach(x=>{
            x.Series.forEach(a=>{
                seriesid.push(a)
            })
         })
         
        const snapseries = query(collection(db, "Series"),where(documentId(),'in',seriesid),where('IsDeleted','==',false));
        const Series = await getDocs(snapseries);

        const categorys = query(collection(db, 'Category'),where(documentId(),'in',data.Categories),where('IsDeleted','==',false))
        const category = await getDocs(categorys);

        const actorsids=query(collection(db, 'Actors'),where(documentId(),'in',data.Actors),where('IsDelete','==',false))
        const Actors= await getDocs(actorsids)

        const directorsids=query(collection(db, 'Directors'),where(documentId(),'in',data.Directors),where('IsDelete','==',false));
        const Directors=  await getDocs(directorsids)

        const Directorlist=[]
        Directors.forEach(z=>{
            const director={
                id:z.id,
                Name:z.data().Name,
                Picture:z.data().Picture
            }
           Directorlist.push(director)
        })

        const Actorlist=[]
        Actors.forEach(z=>{
            const actor={
                id:z.id,
                Name:z.data().Name,
                Picture:z.data().Picture
            }
           Actorlist.push(actor)
        })

        let categoryList=[]
            category.forEach((z)=>{
                    const cate={
                        Id: z.Id,
                        Name: z.data().Language.find((x)=>x.LangCode==lang).Name
                        }
               categoryList.push(cate)
            })

        const twshower=[]
            data.Seasons.forEach((z)=>{
               const season=
                    {
                        id:z.id,
                        Name:z.Name,
                        MainPicture:z.MainPicture,
                        Trailers:z.Trailers,
                        Series:[]
                    }
                z.Series.forEach((a)=>{
                    Series.forEach((x)=>{
                        if (x.id==a) {
                              const series={
                                   id:x.id,
                                   Audios:x.data().Audios,
                                   Subtitles:x.data().Subtitles,
                                   Trailers:x.data().Trailers,
                                   Name:x.data().Language.find(m=>m.LangCode==lang).Name,
                                   description:x.data().Language.find(m=>m.LangCode==lang).Description,
                                   MainPicture:x.data().MainPicture,
                                   Url:x.data().Url,
                                   AddDate:x.data().AddDate.toDate(),
                                   ModifiedOn:x.data().ModifiedOn.toDate(),
                                   Comments:x.data().Comment,
                                   SeasonName:z.Name
                                }
                                const question=user
                                if (data.Platform == 'NetFlix'){
                                    if ( question==null) {
                                         series.Url=null
                                    }else if( question.IsBlock){
                                        series.Url=null
                                    }
                                    else{
                                     Claims=question.Claims.includes(data.Claims)
                                     if (!Claims) {
                                        series.Url=null
                                     }
                                    }
                                }
                            x.data().Comment.forEach(t=>{
                                comentuser.forEach(r=>{
                                    if (r.id==t.UserId) {
                                        series.Comments.push(
                                        {
                                         Name: r.data().Name,
                                         Text: t.Text
                                        })
                                    }
                                })
                            })
                            season.Series.push(series)
                        }
                     })
                })
                twshower.push(season)
        })
            const show=new TwShow(
                data.Language.find((x)=>x.LangCode==lang).Name,
                data.Language.find((x)=>x.LangCode==lang).Description,
                categoryList,
                data.Age,
                Actorlist,
                Directorlist,
                data.MainPicture,
                data.SliderImage,
                data.AddDate.toDate(),
                data.ContentDate,
                data.ModifiedOn.toDate(),
                data.Hit,
                data.Type,
                data.IMDB,
                twshower
            )
            throw res.send(show)
    }
    catch (error) {
        next(new BaseError(httpstatus.BAD_REQUEST,error.message,'TvShowController/GetByIdLang'))
    }
}

const add=async(req,res,next)=>{
    try {
        const data=req.body;

        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        let answer=helper.language(data.language,Languagelist);
        if (!answer) throw new Error('Diller yalnis qeyd olunub')

        let ages=new Validator({
           ContentDate: data.content_date,
           IsSlider:data.is_slider,
           IsFeatured:data.is_featured,
           MainPicture:data.main_picture,
           SliderImage:data.slider_image,
           Claims:data.claims,
           Actors:data.actors,
           Directors:data.directors,
           SliderImage:data.slider_image,
           Trailers:data.trailers,
           Age:data.age,
           Catalogs:data.catalogs,
           Platform:data.platform,
           ContentTypes: data.content_type,
        },
        {
            ContentDate: 'required',
            IsSlider:'required|boolean',
            IsFeatured:'required|boolean',
            MainPicture:'required',
            SliderImage:'required',
            Claims:'required',
            Actors:'required|array',
            Directors:'required|array',
            SliderImage:'required|string',
            Trailers:'required|array',
            Age:'required',
            Catalogs:'required|array',
            Platform:'required|string',
            ContentTypes:'required|string',
        })
        ages.fails(()=>{
            throw new Error(ages.errors.errors)
        })

        await addDoc(collection(db, "Content"),{
            actors:data.actors,
            directors:data.directors,
            language:data.language,
            content_date: data.content_date,
            categories:data.categories,
            main_picture:data.main_picture,
            slider_image:data.slider_image,
            trailers:data.trailers ?? [],
            is_slider:data.is_slider,
            age:data.age,
            is_featured:data.is_featured,
            is_deleted:false,
            imdb:data.imdb ?? '',
            add_date:new Date(),
            modified_on:new Date(),
            claims:data.claims,
            catalogs:data.catalogs,
            hit:0,
            type:"Tvshow",
            platform:data.platform,
            content_type: data.content_type,
            price:data.price ?? 0,
            seasons:[]
            })
            res.send(`əlavə olundu`)
    } catch (error) {
        next(new BaseError(httpstatus.FORBIDDEN,error.message,'TvShowController/add'));
    }
}

const update=async(req,res,next)=>{
    try {
        const id=req.params.id
        const data=req.body;
        
        const Languageref=collection(db,'Language')
        const Languagelist= await getDocs(Languageref);

        let answer=helper.language(data.language,Languagelist);
        if (!answer) throw res.send('Diller yalnis qeyd olunub')

        const ages=new Validator({
            ContentDate: data.content_date,
            IsSlider:data.is_slider,
            IsFeatured:data.is_featured,
            MainPicture:data.main_picture,
            SliderImage:data.slider_image,
            Claims:data.claims,
            Actors:data.actors,
            Directors:data.directors,
            SliderImage:data.slider_image,
            Trailers:data.trailers,
            Age:data.age,
            Catalogs:data.catalogs,
            Platform:data.platform,
            ContentTypes: data.content_type,
         },
         {
             ContentDate: 'required',
             IsSlider:'required|boolean',
             IsFeatured:'required|boolean',
             MainPicture:'required',
             SliderImage:'required',
             Claims:'required',
             Actors:'required|array',
             Directors:'required|array',
             SliderImage:'required|string',
             Trailers:'required|array',
             Age:'required',
             Catalogs:'required|array',
             Platform:'required|string',
             ContentTypes:'required|string',
         })
         ages.fails(()=>{
             throw new Error(ages.errors.errors)
         })

        await updateDoc(doc(db,'Content',id),{
            actors:data.actors,
            directors:data.directors,
            language:data.language,
            content_date: data.content_date,
            categories:data.categories,
            main_picture:data.main_picture,
            slider_image:data.slider_image,
            trailers:data.trailers ?? [],
            is_slider:data.is_slider,
            age:data.age,
            is_featured:data.is_featured,
            is_deleted:false,
            imdb:data.imdb ?? '',
            modified_on:Date.now(),
            claims:data.claims,
            catalogs:data.catalogs,
            hit:0,
            platform:data.platform,
            content_type: data.content_type,
            price:data.price ?? 0,
            })
            res.send(`əlavə olundu`)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports={
    GetById,
    add,
    update,
    GetByIdLang
}