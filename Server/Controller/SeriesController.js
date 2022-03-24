const { doc, getDoc,updateDoc, getDocs,documentId, collection, query, where, addDoc } = require('firebase/firestore');
const db=require('../db')
var jwt = require('jsonwebtoken');
var config = require('../config');
const helper=require('../Helper/Validation');
const Validator=require('validatorjs');

const getallseries=async(req,res)=>{
  try {
   const tvshowid =req.params.tvshowid
   const seasonid=req.params.seasonid
   const tvshow=await getDoc(doc(db,'Content',tvshowid))
    let seriesid;
    
   tvshow.data().Seasons.map(x=>{
      if (x.id==seasonid) {
          seriesid=x.Series
      }
   })
   const SeriesRef= query(collection(db,'Series'),where(documentId(),'in',seriesid))
   const Series=await getDocs(SeriesRef)
     let series=[]
     Series.forEach(x=>{
       series.push(x.data())
     })
   res.send(series)
  } catch (error) {
     res.status(400).send(error.message)
  }
}
const getseriesbyid=async(req,res)=>{
try {
   const id=req.params.id
   const series=await getDoc(doc(db,'Series',id))
   const data=series.data();
   const serie={
     id:series.id,
     modifiedOn: data.ModifiedOn.toDate(),
     adddate:data.AddDate.toDate(),
     language: data.Language,
     url:data.Url,
     trailers:data.Trailers,
     audios:data.Audios,
     subtitles:data.Subtitles,
     mainPicture:data.MainPicture,
     comments:data.Comment
   }
   res.send(serie)
} catch (error) {
   res.status(400).send(error.message)
}
}
const addseries=async(req,res)=>{
   try {
    const data=req.body;
    const seasonid=req.params.seaid;
    let Seasons=[]

    const Languageref=query(collection(db,'Language'),where('IsDeleted','==',false));
    const Languagelist= await getDocs(Languageref);

    const question=new Validator({MainPicture:data.MainPicture,Language:data.Language},{MainPicture:'required|string',Language:'required|array'})
    
    question.fails(()=>{throw res.send(question.errors)})
    let answer=helper.language(data.Language,Languagelist);
    if (!answer) throw res.send('Diller yalnis qeyd olunub')

   const news= await addDoc(collection(db,'Series'),
   {
     MainPicture:data.MainPicture,
     Language:data.Language,
     Trailers:data.Trailers,
     Audios:data.Audios ?? [],
     AddDate:new Date(),
     ModifiedOn:new Date(),
     Subtitles:data.Subtitles ?? [],
     Url:data.Url ?? '',
     IsDeleted:false,
     Comment: [],
  });

   tvshow.forEach(x => {
      x.data().Seasons.forEach(a=>{
         tvshowid=x.id
         if (a.id==seasonid){
            a.Series.push(news._key.path.segments[1])
            Seasons.push(a)
         }else{
            Seasons.push(a)
         }
      })
   })

    await updateDoc(doc(db,'Content',tvshowid),{Seasons:Seasons})

    res.send('Seriya elave olundu')
   } catch (error) {
       res.status(400).send(error.message)
   }
}

const updateseries=async(req,res)=>{
try {
   const id=req.params.id
   const data=req.body
const Languageref=query(collection(db,'Language'),where('IsDeleted','==',false));
const Languagelist= await getDocs(Languageref);

const question=new Validator({MainPicture:data.MainPicture,Language:data.Language},{MainPicture:'required|string',Language:'required|array'})
question.fails(()=>{throw res.send(question.errors)})
let answer=helper.language(data.Language,Languagelist);
if (!answer) throw res.send('Diller yalnis qeyd olunub')
await updateDoc(doc(db,'Series',id),
{
  MainPicture:data.MainPicture,
  Language:data.Language,
  Trailers:data.Trailers,
  Audios:data.Audios ?? [],
  Subtitles:data.Subtitles ?? [],
  ModifiedOn:new Date(),
  Url:data.Url ?? '',
  IsDeleted:false,
  Comment: [],
});

res.send(series.data())
} catch (error) {
res.status(400).send(error.message)
}
}

const addcomments=async(req,res)=>{
try {
   const id=req.params.id
   const data=req.body
   const token=req.headers['x-access-token']
   const decode= jwt.verify(token, config.secret)

   const seriesref=doc(db,"Series",id)
   const series=await getDoc(seriesref)
   let comments=[]
   comments= series.data().Comment?? []

   const datalist={
       id:decode.id,
       Text:data.Text
   }
   comments.push(datalist)
   await updateDoc(seriesref,{
       Comment:comments
   })
   res.send(comments)
} catch (error) {
   res.status(400).send(error.message)
}
}

const deleteseries=async(req,res)=>{
  try {
   const id=req.params.id
   await updateDoc(doc(db,'Series',id),{IsDeleted:true})
   res.send('silindi')
  } catch (error) {
     res.send(error.message)
  }
}

const restoreseries=async(req,res)=>{
   try {
    const id=req.params.id
    await updateDoc(doc(db,'Series',id),{IsDeleted:false})
    res.send('geri qaytarildi')
   } catch (error) {
      res.send(error.message)
   }
}

module.exports={
   addseries,
   addcomments,
   updateseries,
   deleteseries,
   restoreseries,
   getallseries,
   getseriesbyid
}
