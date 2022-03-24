import React from "react";
import * as Icon from "react-bootstrap-icons";
import "./metaflix-mixed.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const MetaFlixMixed = () => {
  return (
    <section className="metaflix-mixed">
      <div className="container">
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
            
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          grabCursor={true}
          loopFillGroupWithBlank={true}
          className="metaflix-mixed-slider"
        >
          <SwiperSlide className="meta-mixed-slide">
            <img src="https://img.europapress.es/fotoweb/fotonoticia_20210823073800_1200.jpg" alt="" />
            <div className="overlay">
              <div className="text">
              <h1>Spider-Man no way Home</h1>
              <div className="icons">
              <Icon.PlayCircle className="play-ico"/>
              </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="meta-mixed-slide">
            <img src="https://playtusu.com/wp-content/uploads/2017/07/star-wars.jpg" alt="" />
            <div className="overlay">
              <div className="text">
              <h1>Spider-Man no way Home</h1>
              <div className="icons">
              <Icon.PlayCircle className="play-ico"/>
              </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="meta-mixed-slide">
            <img src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/the-355-movie-review-2022/the-355-movie-review-2022.jpeg" alt="" />
            <div className="overlay">
              <div className="text">
              <h1>Spider-Man no way Home</h1>
              <div className="icons">
              <Icon.PlayCircle className="play-ico"/>
              </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="meta-mixed-slide">
            <img src="https://www.small-screen.co.uk/wp-content/uploads/2017/11/justice-league-review-4-e1614965949186.jpg" alt="" />
            <div className="overlay">
              <div className="text">
              <h1>Spider-Man no way Home</h1>
              <div className="icons">
              <Icon.PlayCircle className="play-ico"/>
              </div>
              </div>
            </div>
          </SwiperSlide>
         
        </Swiper>
      </div>
    </section>
  );
};

export default MetaFlixMixed;
