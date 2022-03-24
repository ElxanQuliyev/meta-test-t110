import React from "react";
import * as Icon from "react-bootstrap-icons";
import "./special-video.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import dark from "../../assets/video/dark.mp4";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Autoplay,  Pagination, Navigation]);

const SpecialVideoContent = ({ category }) => {
  const [isHovered, setIsHovered] = React.useState(0);


  const isHoverVideo =(index) =>{
       setIsHovered(index)
  }

  return (
    <section className="special-video">
      <div className="container">
        <div className="head-text">
         
           <h1>MetaFlix</h1>
           <p>Ən çox baxılanlar</p>
         
        </div>
        
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          
          grabCursor={true}
          loopFillGroupWithBlank={true}
         
          autoplay={true}
          autoplay={{ delay: 5000, autoplayDisableOnInteraction: true }}
          fadeEffect={{crossFade: true, effect: "fade"}}
          
          breakpoints={{
            280: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            600: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            800: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            1020: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
          }}
          className="meta-slide"
        >
          <SwiperSlide  onLoad={()=> isHoverVideo("no")}  onMouseEnter={()=>isHoverVideo(0)} onMouseLeave={()=>isHoverVideo("none-none")}  className={isHovered===0? "active-video meta-slide-item": "meta-slide-item"}>
                <img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fzetizen.radarcirebon.com%2Fwp-content%2Fuploads%2F2022%2F02%2Fposter-film-Fistful-of-Vengeance.jpg%3Fw%3D1200%26ssl%3D1&f=1&nofb=1"} alt="" />
                
                <>
                  <video controlsList="Volume"   autoPlay loop   src={isHovered===0? dark : "none"}  ></video>
                  <div className="info">
                    <Icon.PlayFill className="play-icon" />
                    <Icon.ShareFill className="share-icon" />
                    <Icon.PlusLg className="save-icon" />
                  </div>
                </>
              </SwiperSlide>
              <SwiperSlide  onLoad={()=> isHoverVideo("no")}  onMouseEnter={()=>isHoverVideo(1)} onMouseLeave={()=>isHoverVideo("none-none")}  className={isHovered===1? "active-video meta-slide-item": "meta-slide-item"}>
                <img src={"https://d2kektcjb0ajja.cloudfront.net/images/posts/feature_images/000/000/072/large-1466557422-feature.jpg?1466557422"} alt="" />
                
                <>
                  <video controlsList="Volume"   autoPlay loop   src={isHovered===1? dark : "none"}  ></video>
                  <div className="info">
                    <Icon.PlayFill className="play-icon" />
                    <Icon.ShareFill className="share-icon" />
                    <Icon.PlusLg className="save-icon" />
                  </div>
                </>
              </SwiperSlide>
              <SwiperSlide  onLoad={()=> isHoverVideo("no")}  onMouseEnter={()=>isHoverVideo(2)} onMouseLeave={()=>isHoverVideo("none-none")}  className={isHovered===2? "active-video meta-slide-item": "meta-slide-item"}>
                <img src={"https://static2.srcdn.com/wordpress/wp-content/uploads/2021/10/One-of-Us-is-Lying-Simon.png?q=50&fit=crop&w=960&h=500&dpr=1.5"} alt="" />
                
                <>
                  <video controlsList="Volume"   autoPlay loop   src={isHovered===2? dark : "none"}  ></video>
                  <div className="info">
                    <Icon.PlayFill className="play-icon" />
                    <Icon.ShareFill className="share-icon" />
                    <Icon.PlusLg className="save-icon" />
                  </div>
                </>
              </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SpecialVideoContent;
