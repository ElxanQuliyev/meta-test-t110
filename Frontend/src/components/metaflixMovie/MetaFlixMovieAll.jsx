import React,{useState, useEffect, useCallback} from "react";
import "../metaflixMovie/iternal-all-film.scss";
import * as Icon from "react-bootstrap-icons";
import { Button } from "semantic-ui-react";
import az from "../../assets/image/azerbaijan.png";
import tr from "../../assets/image/turkey.png";
import ru from "../../assets/image/russian.png";
import { Link } from "react-router-dom";
import { ButtonLight } from "../button/Button";
import {  useParams } from 'react-router';
import metaFlixApi, { category, movieType, tvType } from '../../api/MetaFlixApi';
import apiConfig from "../../api/ApiConfig";
import { useNavigate } from 'react-router-dom';

const MetaFlixMovieAll = (props,type )=> {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
        let response = null;
        
        if (keyword === undefined) {
            const params = {language:"tr"};
            switch(props.category) {
                case category.movie:
                    response = await metaFlixApi.getMoviesList(type, {params});

                    break;
                default:
                    response = await metaFlixApi.getTvList(tvType.popular, {params});
            }
        } else {
            const params = {
                query: keyword
            }
            response = await metaFlixApi.search(props.category, {params});
        }
        setItems(response.results);
        setTotalPage(response.total_pages);
    }
    getList();
}, [props.category, keyword]);

const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
        const params = {
            page: page + 1
        };
        switch(props.category) {
            case category.movie:
                response = await metaFlixApi.getMoviesList(movieType.upcoming, {params});
                break;
            default:
                response = await metaFlixApi.getTvList(tvType.popular, {params});
        }
    } else {
        const params = {
            page: page + 1,
            query: keyword
        }
        response = await metaFlixApi.search(props.category, {params});
        
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
}
  return (
    <section className="iternal-all-film">
     
      <div className="container">
      
      <div className="head-text">
      <div className="left">
         <h1>Filmler</h1>
         </div>
         <div className="right">
        
        <MovieSearch category={props.category} keyword={keyword}/>
        
        {/* <datalist id="categories">
            <option value="Qorxu"></option>
            <option value="Dram"></option>
            <option value="Komedi"></option>
    
        </datalist> */}
         </div>
        </div>
      
        <div className="row">
         {
           items.map((item,i)=>(
            
            <div id={i}   className="col-12 col-sm-6 col-md-4 col-lg-4">
             <div className="film-card">
              <img
                src={apiConfig.orginalImage(item.poster_path)}
                alt=""
              />
              <div className="card-overlay">
                <div className="content-head-txt">
                  <div className="icons">
                    <div className="d-flex justify-content-between align-items-center">
                      <Icon.BadgeHd className="quality-ico" />
                      <span>
                        <Icon.Globe2 className="clock-ico" /> {item.origin_country[0]}
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
                  <Link to={`/Detail/${item.id}`}>
                    
                    <Icon.PlayCircle className="ico-play" />
                    <h1>{item.name}</h1>
                  </Link>
                  <div className="buy-btn">
                    <Button  animated className="ui-btn">
                      <Button.Content visible>izlə</Button.Content>
                      <Button.Content hidden>
                        {" "}
                        <Icon.PlayCircle className="ico-play-trailer" />
                      </Button.Content>
                    </Button>
                    <ul className="list-unstyled d-flex">
                      <li>Qorxu</li>
                      <li>Dram</li>
                      <li>Romantika</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
           ))
         }
         
        </div>
        {
      page < totalPage ? (
         <div className="load-more">
            <ButtonLight onClick={loadMore}>Daha Çox</ButtonLight>
         </div>
    ): null
        }
      
      </div>
    </section>
  );
};
const MovieSearch = props => {

  const history = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(
      () => {
          if (keyword.trim().length > 0) {
            history(`/${category[props.category]}/search/${keyword}`);
              console.log(`/${keyword}`);
          }
      },
      [keyword, props.category, history]
  );

  useEffect(() => {
      const enterEvent = (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
              goToSearch();
          }
      }
      document.addEventListener('keyup', enterEvent);
      return () => {
          document.removeEventListener('keyup', enterEvent);
      };
  }, [keyword, goToSearch]);

  return (
      <div className="movie-search">
          <input placeholder="Axtar"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>Search</Button>
      </div>
  )
}


export default MetaFlixMovieAll;
