import React,{useEffect, useState} from "react";
import "./head-content.scss";
import * as Icon from "react-bootstrap-icons";
import age from '../../assets/image/content18Plus.svg';
import contentAll from '../../assets/image/contentAll.svg';
import contentNegative from '../../assets/image/contentNegative.svg';
import contentViolin from '../../assets/image/contentViolence.svg';
import imdbImg from '../../assets/image/imdb.png';
import Button from '../button/Button';
import { useParams } from 'react-router';
import metaFlixApi from "../../api/MetaFlixApi";
import apiConfig from "../../api/ApiConfig";

const HeadContent = () => {
  const { cate, id } = useParams();

  const [item, setItem] = useState(null);
  useEffect(() => {
      const getDetail = async () => {
          const response = await metaFlixApi.detail(cate, id, {params:{}});
          setItem(response.result);
      }
      getDetail();
  }, [cate, id]);

  return (
    <>
       {
    
    item &&(
      <>
      <section  style={{backgroundImage:`url(${apiConfig.orginalImage(item.backdrop_path)})`}} className="head-content-detail">
      <div className="overlay-detail-post">
        <div className="overlay-post-text">
        <h2>Slasher</h2>
        <ul className="post-text-ul">
          <li className="post-li-img">
            <img src={age} alt="" />
            <img src={contentAll} alt="" />
            <img src={contentNegative} alt="" />
            <img src={contentViolin} alt="" />
 
          </li>
          <li>Dizi</li>
          <li><img src={imdbImg} className="imdb-ico" alt="" />  7.5</li>
        </ul>
        <ul className="post-category-ul">
          <li>Komedi</li>
          <li>Aksiyon</li>
          <li>Korku</li>
        </ul>
        <p className="post-detail-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur sunt omnis, numquam voluptas totam iste veritatis ut nihil, in tempore harum, doloremque eaque accusamus cupiditate accusantium blanditiis voluptatum unde commodi!</p>
        <div className="post-btns">
        <Button  className="post-btn none-btn">Abone ol izle  <Icon.PlayCircle className="ply-circle-ico"/> </Button>
        <Button className="post-btn">1sezon 1bölüm izle <Icon.PlayCircle className="ply-circle-ico"/> </Button>
        </div>
        </div>
      </div>
     </section>
      </>
    )
  }
    </>
 
   
  );
};

export default HeadContent;
