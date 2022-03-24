import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import "./device.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import {  Button } from "semantic-ui-react";
// install Swiper modules
import devicePng from "../../assets/image/movie.png";
import appStorePng from "../../assets/image/app.png";
import googlePlayPng from "../../assets/image/google.png";
<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>;


  SwiperCore.use([Autoplay, Pagination, Navigation]);

const Device = () => {
  return(
      <section className='device-section'>
          <div className="container">
              <div className="row justify-content-between align-items-center">
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-12">
                  <div className="device-text">
                      <h1>Hər yerdən rahat qoşulma istər vebsayt istərsə də android və ya ios mobil tətbiqi yükləyin</h1>
                      <img className='play-img' src={appStorePng} alt="" />
                  </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 col-12">
                  <div className="device-img">
                  <img className='base-img' src={devicePng} alt="" />
                  {/* <img className='alt-img' src={devicePng} alt="" /> */}
                  </div>
              </div>
              </div>
             
          </div>
      </section>
  )
};

export default Device;
