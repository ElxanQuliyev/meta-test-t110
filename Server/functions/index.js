// const functions = require("firebase-functions");
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// const express=require('express');
// const router=express.Router()
// const Auth=require('../middlewares/Auth')


// const {add}=require('../Controller/ActorsController');
// const ContentRoutes=require('../Routes/Content-Routes')
// const TwShowRoutes=require('../Routes/TvShow-Routes')
// // const CinemaLabRotues=require('../Routes/CinemaLab-Routes')
// const CategoryRoutes=require('../Routes/Category-Routes')
// const StudentRoutes=require('../Routes/Student-Routes')
// const SeasonRoutes=require('../Routes/Season-Routes')
// const SeriesRoutes=require('../Routes/Series-Routes')
// const UserRoutes=require('../Routes/User-Routes')
// const FilterRoutes=require('../Routes/Filter-Routes')
// const PlatformrefRoutes=require('../Routes/Platformref-Routes')
// const PromoRoutes=require('../Routes/Promo-Routes')
// const LanguageRoutes=require('../Routes/Language-Routes')
// // const ActorsRoutes=require('../Routes/Actors-Routes')
// const DirectorsRoutes=require('../Routes/Directors-Routes')
// const CatalogsRoutes=require('../Routes/Catalogs-Routes')
// const ContentTypeRoutes=require('../Routes/ContentType-Routes')
// const HistoryRoutes=require('../Routes/History-Routes')
// const PlatformRoutes=require('../Routes/Platform-Routes')
// const FavoryRoutes=require('../Routes/Favory-Routes')



// // router.use('/api/film',FilmRoutes)
// // router.use('/api/Contents',ContentRoutes.routes)
// // router.use('/api/TvShow',TwShowRoutes.router)
// // // rerout.use('/api/CinemaLab',CinemaLabRotues.routes)
// // router.use('/api/category',CategoryRoutes)
// // router.use('/api',StudentRoutes.routes)
// // router.use('/api/season',SeasonRoutes.routes)
// // router.use('/api/series',SeriesRoutes.routes)
// // router.use('/api/user',UserRoutes.routes)
// // router.use('/api/platformref',PlatformrefRoutes.routes)
// // router.use('/api/filter',FilterRoutes.routes)
// // router.get('/api/promo',(req,res,next)=>{
// //     console.log("salam dost");
// //     res.send("Salam dunya")
// // })
// // router.use('/api',LanguageRoutes.routes)
// // router.use('/api/actors',ActorsRoutes)
// // router.use('/api/directors',DirectorsRoutes)
// // router.use('/api/catalogs',CatalogsRoutes)
// // router.use('/api/contenttype',ContentTypeRoutes)
// // router.use('/api/history',HistoryRoutes.routes)
// // router.use('/api/platform',PlatformRoutes)
// // router.use('/api/favory',FavoryRoutes)
// router.use('/actors/add',add);

// exports.api=functions.region('europe-west1').https.onRequest(router)
