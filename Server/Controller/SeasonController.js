const db=require('../db');
const Validator=require('validatorjs');
const { getDoc, doc, updateDoc, addDoc, collection,query, getDocs, where, documentId } = require('firebase/firestore');
const BaseError=require('../errorhandle/baseError');
const httpstatus = require('http-status');

const add=async(req,res,next)=>{
  try {
    const data=req.body;
    const id=req.params.id;
    const tvshow=await getDoc(doc(db,'Content',id));
    if (tvshow.data().type!='Tvshow') {
        throw new Error('Tv Show id duzgun qeyd eilmeyib')
    }
    const Seasons=tvshow.data().seasons;

    const answer=new Validator(
        {
            Name:data.name,
            MainPicture:data.main_picture,
            Trailers:data.trailers,
        },
        {
         Name:'required',
         MainPicture:'required|string',
         Trailers:'required|array',
        }
    )
    answer.fails(()=>{throw new Error(answer.errors)})

    const season= await addDoc(collection(db,'Season'),{
        name:data.name,
        tvShowId:id,
        is_deleted:false,
        main_picture:data.main_picture,
        trailers:data.trailers,
        add_date:new Date(),
        series:[]
    })
    Seasons.push(season._key.path.segments[1])
    await updateDoc(doc(db,'Content',id),{
      seasons:Seasons
    });
    res.send('elave olundu')
  } catch (error) {
    next(new BaseError(httpstatus.BAD_REQUEST,error.message,'SeasonController/add'))
  }
}

const update=async(req,res,next)=>{
    try {
        const data=req.body;
        const id=req.params.id;
        let val=new Validator({
            Name:data.name,
            Trailers:data.trailers,
            MainPicture:data.main_picture,
        },
        {
            Name:'required',
            Trailers:'required|array',
            MainPicture:'required|string',
        }
        )
        val.fails(()=>{
           throw new Error(val.errors)
        })
        await updateDoc(doc(db,'Season',id),{
            name:data.name,
            main_picture:data.main_picture,
            trailers:data.trailers,
        })
        res.send('Seasons updated')
      } catch (error) {
          next(new BaseError(httpstatus.NOT_FOUND,error.message,'SeasonController/update'))
      }
}

const getall=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const tvshow=await getDoc(doc(db,'Content',id))
        const seasonsref=query(collection(db,'Season'),where(documentId(),'in',tvshow.data().seasons),where('is_deleted','==',false))
        const seasonlist=[]
        const seasons=await getDocs(seasonsref).then(response=>{
            response.forEach(x=>{
                seasonlist.push({
                    id:x.id,
                    name:x.data().name,
                    main_picture:x.data().main_picture,
                    series:x.data().series,
                    trailers:x.data().trailers,
                    add_date:Date(x.data().add_date)
                 })
            })
        })
        res.send(seasonlist.sort(()=> {return -1;}))
      } catch (error) {
          next(new BaseError(httpstatus.NOT_FOUND,error.message,'SeasonController/getall'))
      }
}

const GetById=async(req,res,next)=>{
    try {
       const id=req.params.id
       const seasonref= await getDoc(doc(db,'Season',id))
       const season={
           id:seasonref.id,
           name:seasonref.data().name,
           main_picture:seasonref.data().main_picture,
           series:seasonref.data().series,
           trailers:seasonref.data().trailers
       }
       res.send(season)
    } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'SeasonController/GetById'))
    }
}

const remove=async(req,res,next)=>{
    try {
        const id=req.params.id;
        await updateDoc(doc(db,'Season',id),{is_deleted:true})
        res.send('Season deleted')
      } catch (error) {
          next(new BaseError(httpstatus.NOT_FOUND,error.message,'SeasonController/remove'))
      }
}

const restore=async (req,res)=>{
    try {
        const id=req.params.id;
        await updateDoc(doc(db,'Season',id),{is_deleted:false})
        res.send('Season restored')
      } catch (error) {
        next(new BaseError(httpstatus.NOT_FOUND,error.message,'SeasonController/restore'))
      }
}

module.exports={
    add,
    update,
    getall,
    remove,
    restore,
    GetById
}