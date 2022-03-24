import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import MetaFlixMixed from "../components/metaflix-mixed/MetaFlixMixed";
import Filter from "../components/filter/Filter";
import SpecialVideoContent from "../components/special-video-content/SpecialVideoContent";
import CinemaLabSlider from "../components/CinemaLab-content/CinemaLabSlider";
import MetaFlixMovieAll from "../components/metaflixMovie/MetaFlixMovieAll";
import RegisterSection from "../components/register-section/RegisterSection";
import Favorite from "../components/profil/Favorite";
import SpecialContent from "../components/special-content/SpecialContent";
import metaFlixApi,{category, movieType,tvType} from "../api/MetaFlixApi";
import apiConfig from "../api/ApiConfig";
import * as Icon from "react-bootstrap-icons";

const Catalog = () => {
  const { category } = useParams();
  const [platform, setPlatfrom] = useState([]);
   
  return (
    <>
      {category === "CinemaLab" || category === "Platformalar" ? (
        <>
          {" "}
           <CinemaLabSlider /> 
        </>
      ) : (
        <>
           <MetaFlixMixed />
        </>
      )}
      {category === "MetaFLixOrjinal" ? (
        <>
        
          {" "}
        
        <SpecialVideoContent ></SpecialVideoContent>
        <SpecialVideoContent ></SpecialVideoContent>
        <SpecialVideoContent></SpecialVideoContent>
        <SpecialVideoContent></SpecialVideoContent>
        <RegisterSection name="Qeydiyyatdan Keç"/>


        </>
      ) : (
        <>
          {" "}
         
        <SpecialVideoContent></SpecialVideoContent>
        <SpecialVideoContent></SpecialVideoContent>
        <SpecialVideoContent></SpecialVideoContent>
         <SpecialContent category={tvType.popular} btnContent={<Icon.PlayCircle className="ico-play-trailer" />}/>
         <SpecialContent category={tvType.top_rated} btnContent={<Icon.PlayCircle className="ico-play-trailer" />}/>
         <RegisterSection name="Keçid Edin"/>

     
        </>
      )}
       <Favorite/>

    
      {category ==="MetaFlixOrjinal" ? (
        <>
        
          
        
         

        </>
      ) :(
       <>

       </>
      )}
      <MetaFlixMovieAll></MetaFlixMovieAll>
    </>
  );
};

export default Catalog;
