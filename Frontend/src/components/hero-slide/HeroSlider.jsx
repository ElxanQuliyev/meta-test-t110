import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import * as Icon from "react-bootstrap-icons";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "semantic-ui-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import './hero-slider.scss';
import metaFlixApi, { category,tvType } from '../../api/MetaFlixApi';
import apiConfig from '../../api/ApiConfig';
import age from '../../assets/image/content18Plus.svg';
import contentAll from '../../assets/image/contentAll.svg';
import contentNegative from '../../assets/image/contentNegative.svg';
import contentViolin from '../../assets/image/contentViolence.svg';
import trailerVideo from '../../assets/video/dark.mp4';
import Modal,{ModalContent} from '../../components/modal/Modal';
import imdbImg from '../../assets/image/imdb.png';
const HeroSlider = () => {
    const [movieItems, setMovieItems] = useState([]);
   
    useEffect(() => {
      const getMovies = async () =>{
          const params = {page:1,language:"en"};
          if(movieItems.type !== 'similar'){
            try {
                const response = await metaFlixApi.getMoviesList(tvType.popular, {params});
                setMovieItems(response.results.slice(0,4));
            } catch{
                console.log("error");
            }
          }
      }
      getMovies();
    }, [movieItems])
  return (
    <section className='hero-slide'>
  <Swiper
        spaceBetween={0}
        effect={"fade"}
        // navigation={true}
        pagination={{
          clickable: true,
          type: 'bullets',

        }}
        loop={true}
        slidesPerGroup={1}
        slidesPerView={1}
        autoplay={{delay:5000}}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="hero-slider-content"
      >
          {
              movieItems.map((movie, i)=>(
              
                <SwiperSlide key={i} style={{backgroundImage:`url(${apiConfig.orginalImage(movie.backdrop_path)})`}} className={`hero-slide-item`}>
                   {({ isActive=true }) => (
                    <OverlayHero  movie={movie} className={`${isActive ? 'hero-item-component active' : ''}`} />
                   )}
                    
              </SwiperSlide>
              ))
          }
      </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
    </section>
  )
}
const OverlayHero = (props) =>{
    const movie = props.movie;
    const [isVideo, setVideo ] = useState(0);
    const hoveredVideo = (index) =>{
         setVideo(index);
     }
     const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${movie.id}`);

      const videos = await metaFlixApi.getVideos(category.movie, movie.id);

      if (videos.results.length > 0) {
          const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
          modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
      } else {
          modal.querySelector('.modal__content').innerHTML = 'No trailer';
      }

      modal.classList.toggle('active');
  }
return(
    <div onLoad={()=>hoveredVideo("none-video")} onMouseEnter={()=> hoveredVideo(0)} onMouseLeave={()=> hoveredVideo("none-video")} className={isVideo===0?"active-video overlay-hero":"overlay-hero"}>
        
        <div className="overlay-hero-text">
            <h4>{movie.title}</h4>
            <ul className='d-flex'>
                <li><Icon.Dot className='ico-dot'/> {(category.movie)? "Film": "Tv Show"}</li>
                <li><Icon.Dot className='ico-dot'/> Yapım yılı: {movie.release_date}</li>
                <li><img className='imdb-ico' src={imdbImg} alt="" />{movie.vote_average}</li>
            </ul>
            <ul className='d-flex'>
                <li><Icon.Dot className='ico-dot'/>Komedi</li>
                <li><Icon.Dot className='ico-dot'/>Korku</li>
                <li><Icon.Dot className='ico-dot'/>Dram</li>
                <li><Icon.Dot className='ico-dot'/>Polisiye</li>

            </ul>
            <ul className='d-flex'>
                <li><img className='content-degree-img' src={age} alt="" /></li>
                <li><img className='content-degree-img' src={contentAll} alt="" /></li>
                <li><img className='content-degree-img' src={contentNegative} alt="" /></li>
                <li><img className='content-degree-img' src={contentViolin} alt="" /></li>     
            </ul>
            <p>{movie.overview}</p>
            <Button onClick={setModalActive} animated className="btn-view">
                      <Button.Content visible>izlə</Button.Content>
                      <Button.Content hidden>
                        {" "}
                        <Icon.PlayCircle className="ico-play-trailer" />
                      </Button.Content>
            </Button>
        </div>
        <div className="overlay-hero-video">
          <video onLoad={()=>hoveredVideo("none-video")} onMouseLeave={()=> hoveredVideo("none-video")} muted autoPlay loop className='video-content' src={isVideo===0? trailerVideo : "none"}></video>
        </div>
    </div>
)
}

const TrailerModal = props => {
  const item = props.item;
   
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
      <Modal active={false} id={`modal_${item.id}`}>
          <ModalContent onClose={onClose}>
              <iframe ref={iframeRef} width="100%" height="400px" title="trailer"></iframe>
          </ModalContent>
      </Modal>
  )
}
export default HeroSlider