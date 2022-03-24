import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "../header/header.scss";
import { Link, NavLink} from "react-router-dom";
import logo from "../../assets/image/MetaWhiteSvg.svg";
const Header = () => {
  const [isActive, setActive] = React.useState(false);
  const [isActivePage, setActivePage] = React.useState(0);
  const activePage = (index) =>{
    setActivePage(index);
    
  }
 
  const openMenu = () => {
    setActive(true);
  };
  const closeMenu = () => {
    setActive(false);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  setTimeout(metaScroll, 5000);
  function metaScroll() {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);

      return () => (window.onscroll = null);
    };
  }

  return (
    <>
      <header className={isScrolled ? "header scroll" : "header"}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <NavLink  onClick={() => activePage(0)} className={isActivePage===0?" active":""} to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          <nav className="nav-menu">
            <ul className="d-flex list-unstyled m-0">
            <li   className={"main-li"} id="platform">
               <NavLink activeClassName="active" to="/">Ana Səhifə</NavLink>
             </li>
              <li  onClick={() => activePage(1)} className={isActivePage===1?"main-li meta-original":"meta-original main-li"} id="platform">
                <NavLink   activeClassName="active"   to="/MetaFLixOrjinal">MetaFlix Orjinal</NavLink>
              </li>
              <li className={"main-li"} >
                Səhifələr
                <ul className="child-ul">
                  <li  className={"child-li"} >
                    <NavLink activeClassName="child-active" className="child-a" to="/Filmlər">Filmlər</NavLink>
                  </li>
                  <li   className={"child-li"}>
                    <NavLink activeClassName="child-active" className="child-a" to="/Seriallar">Seriallar</NavLink>
                  </li>

                  <li   className={"child-li"}>
                    <NavLink activeClassName="child-active" className="child-a" to="/CinemaLab">CinemaLab</NavLink>
                  </li>
                </ul>
              </li>
              <li   className={"main-li"}  id="platform">
                <NavLink activeClassName="active"  to="/Platformalar">Platformalar</NavLink>
              </li>
            </ul>
          </nav>
          <div className="right">
              <div className="d-flex align-items-center">
              <div className="search-filter">
           <NavLink to="/SearchContent"> <Icon.Search className="search-filter-ico"/></NavLink>
            
          </div>
          <div className="register">
            <div className="sign-in">
              <div className="d-flex align-items-center">
                <Icon.PersonFill className="user-ico" />
                <img
                  className="profil-img"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2324687.jpg&f=1&nofb=1"
                  alt=""
                />
                <h5><NavLink to="/ProfilePage">Murad Musalı</NavLink></h5>
              </div>
              <div className="user-content">
                <ul>
                  <li>
                    <NavLink to="/ProfilePage">
                      <Icon.PersonCircle className="person-ico" /> Hesab
                    </NavLink>
                  </li>
                  <li>
                    <Link to="/ProfilePage">
                      <Icon.GearFill className="person-ico" /> Parametrlər
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Icon.BoxArrowLeft className="person-ico" /> Çıxış et
                    </Link>
                  </li>
                  <li>
                    <Link to="/Register">
                      <Icon.BoxArrowRight className="person-ico" /> Daxil Ol
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <Link className="sign-up" to="/RegisterPage">
              Qeydiyyat
            </Link> */}
          </div>
          <div className="nav-btn">
            <Icon.ListNested onClick={openMenu} className="nav-ico" />
          </div>
              </div>
          </div>
         
        </div>
      </header>
      <div className={`responsive-menu ${isActive ? "active" : ""}`}>
        <div className="close">
          <Icon.XOctagon onClick={closeMenu} className="close-ico" />
        </div>
        <div className="menu">
          <ul className="list-unstyled base-ul">
          <li className="main-li active " id="platform">
              <Link className="active" to="/">
                Ana səhifə
              </Link>
            </li>
            <li className="main-li active " id="platform">
              <Link className="active" to="/MetaFLixOrjinal">
                MetaFlix Orjinal
              </Link>
            </li>
            <li className="main-li" id="platform">
              <Link to="/Filmlər">Filmlər</Link>
            </li>
            <li className="main-li" id="platform">
              <Link to="/Seriallar">Seriallar</Link>
            </li>

            <li className="main-li">
              <Link to="/CinemaLab">CinemaLab</Link>
            </li>
            <li className="main-li" id="platform">
              <Link to="/Platformalar">Platformalar</Link>
            </li>
          </ul>
        
        
        </div>
      </div>
    </>
  );
};

export default Header;
