import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import "./special-content.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { Button } from "semantic-ui-react";
import az from "../../assets/image/azerbaijan.png";
import tr from "../../assets/image/turkey.png";
import ru from "../../assets/image/russian.png";
import metaFlixApi from "../../api/MetaFlixApi";
import apiConfig from "../../api/ApiConfig";
<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>;

const SpecialContent = ({ category,btnContent }) => {
 

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1, language:"en"}
            try {
                const response = await metaFlixApi.getMoviesList(category, {params});
                setMovieItems(response.results.slice(0,8));
            } catch {
                console.log('error');
            }
        }
        getMovies();
    });
  return (
    <section className="special-content">
      <div className="container">
        <div className="head-content">
          <h1>MetaFlix</h1>
          <p>Ödənişli kontentlər</p>
        </div>
        <div className="content">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={3}
            loop={true}
            grabCursor={true}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              280: {
                slidesPerView: 2,
                width: 670,
                height: 100,
                slidesPerGroup: 1,
              },
              // when window width is >= 768px
              576: {
                slidesPerView: 2,
                width: 600,
                slidesPerGroup: 1,
              },
              600: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                width: 780,
              },
              800: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                width: 1200,
              },
              1020: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                width: 1300,
              },
            }}
            className="meta-special"
          >
          {
            movieItems.map((item,i)=>(
              <SwiperSlide key={i} className="special-slider">
              <img src={apiConfig.orginalImage(item.poster_path)} alt="" />
              <div className="overlay-content">
                <div className="content-head-txt">
                  <div className="icons">
                    <div className="d-flex justify-content-between align-items-center">
                      <Icon.BadgeHd className="quality-ico" />
                      <span>
                        <Icon.Globe2 className="clock-ico" /> 2s 40d
                      </span>

                      <Icon.Cast className="quality-ico" />
                    </div>
                    <div className="lang">
                      <img src={az} alt="" />
                      <img src={tr} alt="" />
                      <img src={ru} alt="" />
                    </div>
                  </div>
                </div>
                <div className="content-text">
                  <Link to="/">
                    <Icon.PlayCircle  className="ico-play" />
                    <h1>{item.title}</h1>
                  </Link>
                  <div className="buy-btn">
                    <Button animated className="ui-btn">
                      <Button.Content visible>izlə</Button.Content>
                      <Button.Content hidden>{btnContent}</Button.Content>
                    </Button>
                    <ul className="list-unstyled d-flex">
                      <li>Dram</li>
                      <li>Komedi</li>
                      <li>Ailə</li>
                    </ul>
                  </div>
                </div>
              </div>
             
  </SwiperSlide>
            ))
          }
      
          </Swiper>
        
        </div>
      </div>
       
    </section>
  );
};


export default SpecialContent;
