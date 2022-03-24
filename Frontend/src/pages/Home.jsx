import React from "react";
import MetaFlixMixed from "../components/metaflix-mixed/MetaFlixMixed";
import RegisterSection from "../components/register-section/RegisterSection";
import SpecialContent from "../components/special-content/SpecialContent";
import SpecialVideoContent from "../components/special-video-content/SpecialVideoContent";
import Watching from '../components/profil/Watching';
import MetaFlixMovieAll from "../components/metaflixMovie/MetaFlixMovieAll";
import Favorite from '../components/profil/Favorite';
import {movieType,tvType, category} from "../api/MetaFlixApi";
import HeroSlider from "../components/hero-slide/HeroSlider";
import * as Icon from "react-bootstrap-icons";

const Home = () => {
 
  return (
    <>
      <HeroSlider/>
      <SpecialContent category={movieType.popular} btnContent="10 Azn"/>
      <Watching/>
      <RegisterSection name="Keçid Edin"/>
      <SpecialVideoContent/>  
      <SpecialVideoContent/>  
      <SpecialVideoContent/>  

      <MetaFlixMixed/>
      <RegisterSection name="Keçid Edin"/>
      <SpecialContent category={movieType.popular} btnContent={<Icon.PlayCircle className="ico-play-trailer" />}/>
      <SpecialContent category={tvType.popular} btnContent={<Icon.PlayCircle className="ico-play-trailer" />}/>
      <Favorite/>
      <MetaFlixMovieAll category={category.tv} type={movieType.popular}/>
 
    </>
  );
};

export default Home;
