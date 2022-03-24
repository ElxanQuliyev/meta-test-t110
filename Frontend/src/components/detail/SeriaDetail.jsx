import React from "react";
import "swiper/css";
import SwiperCore, { Autoplay, FreeMode } from "swiper";
import "./seria-detail.scss";
import Actor from '../../components/detail/Actor';
import Comment from '../../components/detail/Comment'
import Series from "./Series";
import {movieType,tvType} from "../../api/MetaFlixApi";

import SpecialContent from '../../components/special-content/SpecialContent';
<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>;

SwiperCore.use([FreeMode, Autoplay]);

 

const SeriaDetail = () => {
   let [isOpen, SetOpen] = React.useState(1);

   const openTrailer = (index) => {
     SetOpen(index);
   }
   
  return (
    <section className="season-content-detail">
       <div className="container">
        
           <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
             <div className="seria-detail-trailer">
              <div className="btn-trailer">
               <button onClick={() => openTrailer(1)} className={isOpen===1? "active-button": "trailerBtn"} id="trailerBtn">Bölümlər</button>
               <button onClick={() => openTrailer(2)} id="trailerBtn" className={isOpen===2? "active-button": "trailerBtn"}>Fraqmentlər</button>
               <button onClick={() => openTrailer(3)} id="trailerBtn" className={isOpen===3? "active-button": "trailerBtn"}>Haqqında</button>
               <button onClick={() => openTrailer(4)} id="trailerBtn" className={isOpen===4? "active-button": "trailerBtn"}>Kommentlər</button>
              </div>
                
             </div>
           </div>
           <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
             <div className={isOpen===1?"actor-area":"actor-none"}>
               <Series name="Bölümlər"/>
               <SpecialContent category={movieType.popular}/>
      <SpecialContent category={tvType.popular}/>

             </div>
           </div>
           <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
             <div className={isOpen===2?"actor-area":"actor-none"}>
               <Series name="Fraqmanlar"/>
             </div>
           </div>
           <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
             <div className={isOpen===3?"actor-area":"actor-none"}>
               <Actor/>
             </div>
           </div>
           <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
             <div className={isOpen===4?"actor-area":"actor-none"}>
               <Comment/>
             </div>
           </div>
     </div>
    </section>
  );
};

export default SeriaDetail;
