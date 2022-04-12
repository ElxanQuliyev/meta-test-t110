const express=require('express');
const { filter, filterPlatform, filterslider, pricefilter, search }=require('../Controller/FilterController');

const router= express.Router();

router.get('/contents/:lang/:platform/:type/:catalog',filterPlatform);
// router.get('/contents/:lang/:catalog',filter);
router.get('/contents/:lang/:catalog',filter);

router.get('/slidercontents/:lang',filterslider);
router.get('/pricecontents/:lang',pricefilter);
router.get('/search/:name',search)
module.exports={
    routes: router
}