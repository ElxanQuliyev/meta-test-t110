import React, {useState} from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { FreeMode, Navigation, Thumbs } from "swiper";
import {  Button } from "semantic-ui-react";
import SwiperCore, { Autoplay } from "swiper";
import "./cinemaLab-slider.scss";
<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>;

const CinemaLabSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    SwiperCore.use([Autoplay]);
  return(
      <section>
   <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 5000 }}
        
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="CinemaLabSlider2"
      >
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic1.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2020%2F08%2F10-Best-Movies-on-Netflix-You-Didn---t-Know-Were-Made-By-Famous-Directors-amp-What-They---re-Known-For.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                     
                     <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic3.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2021%2F01%2FNetflix-2021-Movies.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
         
        <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div> <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fshadesofnoir.org.uk%2Fwp-content%2Fuploads%2F2019%2F11%2FLionheart-film_Netflix.jpg%3Ffit%3D1280%252C720%26ssl%3D1&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgix.bustle.com%2Fuploads%2Fimage%2F2019%2F9%2F6%2F30bdb8e1-7187-458f-97fc-dd2fb86b981c-ee_unit_01538-1.jpg%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dfaces%26fm%3Djpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.teenvogue.com%2Fphotos%2F5f63aeb1c35721329431e1f2%2F16%3A9%2Fw_1280%2Cc_limit%2Ffb.jpg%3Fmbid%3Dsocial_retweet&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.tatlerasia.com%2Fasiatatler%2Fi%2Fhk%2F2020%2F10%2F09113446-best-family-movies-to-watch-on-netflix-night-at-the-museum-secret-of-the-tomb_cover_1280x720.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.netflixmovies.com%2Fdibsl9ebc%2Fimage%2Fupload%2Fw_1920%2Ch_800%2Cc_fill%2Cg_faces%2Cq_62%2Fwxaqeltdied58dgob4cu.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets3.thrillist.com%2Fv1%2Fimage%2F2803275%2Fsize%2Ftmg-facebook_social.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriesmaza.com%2Fwp-content%2Fuploads%2F2020%2F12%2FAlive-Netflix-Movie-Review.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic3.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2020%2F10%2FEmma-Roberts-Holidate-Netflix.jpg&f=1&nofb=1" />
          <div className="cinemaLab-overlay">
              <div className="container">
                  <div className="Cinema-lab-text">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                     <h1><Link to="/Detail">Irishman Lorem ipsum dolor sit amet.</Link></h1>
                      <Icon.PlayCircle className='play-ico'/>
                       <div className="col-md-6 m-auto col-lg-6 col-xl-6">
                       <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis nisi voluptatum corporis, unde dolorem cum doloremque culpa officia quaerat suscipit? amet consectetur, adipisicing elit. Sapiente aperiam consequuntur modi eveniet officia nam, temporibus ut cupiditate quod provident!</p>
                       </div>
                     </div>
                  </div>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        autoplay={{ delay: 5000 }}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="CinemaLabSlider"
      >
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic1.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2020%2F08%2F10-Best-Movies-on-Netflix-You-Didn---t-Know-Were-Made-By-Famous-Directors-amp-What-They---re-Known-For.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic3.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2021%2F01%2FNetflix-2021-Movies.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fshadesofnoir.org.uk%2Fwp-content%2Fuploads%2F2019%2F11%2FLionheart-film_Netflix.jpg%3Ffit%3D1280%252C720%26ssl%3D1&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgix.bustle.com%2Fuploads%2Fimage%2F2019%2F9%2F6%2F30bdb8e1-7187-458f-97fc-dd2fb86b981c-ee_unit_01538-1.jpg%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dfaces%26fm%3Djpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.teenvogue.com%2Fphotos%2F5f63aeb1c35721329431e1f2%2F16%3A9%2Fw_1280%2Cc_limit%2Ffb.jpg%3Fmbid%3Dsocial_retweet&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.tatlerasia.com%2Fasiatatler%2Fi%2Fhk%2F2020%2F10%2F09113446-best-family-movies-to-watch-on-netflix-night-at-the-museum-secret-of-the-tomb_cover_1280x720.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.netflixmovies.com%2Fdibsl9ebc%2Fimage%2Fupload%2Fw_1920%2Ch_800%2Cc_fill%2Cg_faces%2Cq_62%2Fwxaqeltdied58dgob4cu.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets3.thrillist.com%2Fv1%2Fimage%2F2803275%2Fsize%2Ftmg-facebook_social.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriesmaza.com%2Fwp-content%2Fuploads%2F2020%2F12%2FAlive-Netflix-Movie-Review.jpg&f=1&nofb=1" />
        </SwiperSlide>
        <SwiperSlide className='cinemaLab-slide-content'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic3.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2020%2F10%2FEmma-Roberts-Holidate-Netflix.jpg&f=1&nofb=1" />
        </SwiperSlide>
      </Swiper>
      </section>
  )
};

export default CinemaLabSlider;
