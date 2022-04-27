const functions = require("firebase-functions");

const app=require('express')()
const bodyParser=require("body-parser");
const { getall } = require("../Controller/ActorsController");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// const FilmRoutes=require('../Routes/Film-Routes')
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
// const ActorsRoutes=require('../Routes/Actors-Routes')
// const DirectorsRoutes=require('../Routes/Directors-Routes')
// const CatalogsRoutes=require('../Routes/Catalogs-Routes')
// const ContentTypeRoutes=require('../Routes/ContentType-Routes')
// const HistoryRoutes=require('../Routes/History-Routes')
// const PlatformRoutes=require('../Routes/Platform-Routes')
// const FavoryRoutes=require('../Routes/Favory-Routes')



// app.use('/api/film',FilmRoutes)
// app.use('/api/Contents',ContentRoutes.routes)
// app.use('/api/TvShow',TwShowRoutes.router)
// // appout.use('/api/CinemaLab',CinemaLabRotues.routes)
// app.use('/api/category',CategoryRoutes)
// app.use('/api',StudentRoutes.routes)
// app.use('/api/season',SeasonRoutes.routes)
// app.use('/api/series',SeriesRoutes.routes)
// app.use('/api/user',UserRoutes.routes)
// app.use('/api/platformref',PlatformrefRoutes.routes)
// app.use('/api/filter',FilterRoutes.routes)
// app.use('/api',PromoRoutes.routes)
// app.use('/api',LanguageRoutes.routes)
// app.use('/api/actors',ActorsRoutes)
// app.use('/api/directors',DirectorsRoutes)
// app.use('/api/catalogs',CatalogsRoutes)
// app.use('/api/contenttype',ContentTypeRoutes)
// app.use('/api/history',HistoryRoutes.routes)
// app.use('/api/platform',PlatformRoutes)
// app.use('/api/favory',FavoryRoutes)
app.get('/actors/getall',getall)


exports.webApi= functions.https.onRequest(app);
