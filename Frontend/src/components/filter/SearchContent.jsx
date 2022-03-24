import React from 'react'
import Button from '../button/Button';
import './search-content.scss';
import MetaFlixMovieAll from "../../components/metaflixMovie/MetaFlixMovieAll";
import SpecialContent from "../../components/special-content/SpecialContent";
import Favorite from '../profil/Favorite';

const SearchContent = () => {
  let [isActiveTab, setActiveTab] = React.useState(1);
  let openTab = (index) =>{
    setActiveTab(index)
  }
  return (
    <section className='searchContent'>
       <div className="search-filter">
           
            <div className="search-sec">
              <form action='/SearchContent'>
                <input type="search" placeholder="axtar..." required className="inp-search" />
              </form>
            </div>
          </div>
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
         <div style={{backgroundImage:`url(https://themebeyond.com/html/movflx/img/bg/footer_bg.jpg)`}} className="found-content-head">
          <h1><span>"Squid Game"</span> axtarış üzrə <span> 200 </span> nəticə tapıldı.</h1>
        </div>
        <div className="found-content">
          <div className="found-btn">
            <Button onClick={()=> openTab(1)} className={isActiveTab===1?'btn-tab-search tab-active-btn': "btn-tab-search"}>Axtarış nəticəsi</Button>
            <Button onClick={()=> openTab(2)} className={isActiveTab===2?'btn-tab-search tab-active-btn': "btn-tab-search"}>Kəşfet</Button>
          </div>
          <div className="found-btn-content">
           <div className={isActiveTab===1? "searchAll active-tab-content":"searchAll"}>
           <MetaFlixMovieAll  />
           </div>
           <div className={isActiveTab===2? "searchAll active-tab-content":"searchAll"}>
           <SpecialContent   category="contents/TR/MostView" />
           <Favorite/>
           </div>
          </div>
        </div>
         </div>
    </section>
  )
}

export default SearchContent