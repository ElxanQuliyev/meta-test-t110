const express=require('express');
const { addseries, addcomments, updateseries, deleteseries, restoreseries, getallseries, getseriesbyid } = require('../Controller/SeriesController');

const router=express.Router();

router.get('/getall/:tvshowid/:seasonid',getallseries)
router.get('/getbyid/:id',getseriesbyid)
router.post('/add/:seaid',addseries)
router.put('/update/:id',updateseries)
router.patch('/delete/:id',deleteseries)
router.patch('/restore/:id',restoreseries)
router.post('/comment/:id/add',addcomments)

module.exports={routes:router}