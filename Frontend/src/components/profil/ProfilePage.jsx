import React from 'react'
import './profile-page.scss';
import { NavLink } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from '../button/Button';
import ProfileContent from './ProfileContent';
import PricingPlan from './pricing/PricingPlan';
import SettingProfile from './setting-profile/SettingProfile';

const ProfilePage = () => {
  const [isProfileContent, setProfileContent] = React.useState(1);
  const openPageProfile = (index) => {
    setProfileContent(index)
    console.log(index);
  }
  return (
    <section className='profilePage'>
      <div style={{backgroundImage:`url(http://template.gentechtreedesign.com/html/streamlab/intro/images/asset-54.jpg)`}} className="profile-head">
        <div className="overlay-profile">
          <div className="txt">
           <div className="container txt-container">
           <div className="left">
               <h1> <span>Mənim</span> MetaFlix<span>'im</span></h1>
             </div>
             <div className="right">
               <ul className='d-flex list-unstyled justify-content-center align-items-center m-0'>
                 <li><NavLink activeClassName="active-page-ico" className="right-page-ico" to="/">Ana səhifə</NavLink> <Icon.ArrowRightShort/></li>
                 <li><NavLink activeClassName="active-page-ico" className="right-page-ico active-page-ico" to="/ProfilePage">Profil</NavLink></li>
               </ul>
             </div>
           </div>
          </div>
        </div>
      </div>
      <div className="profile-head-description container">
        <div className="profile-name">
          <div className="name-content">
       <div className="name">
       <Icon.PersonFill className="user-ico" />
          <img
                  className="profil-img"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2324687.jpg&f=1&nofb=1"
                  alt=""
                />
          
          <div className="user-id">
          <h5><NavLink to="/ProfilePage">Murad Musalı</NavLink></h5>
         <p>MetaFlix ID : <span>0101</span></p>
       </div>
       </div>
      
          </div>
        </div>
        <div className="profile-selector">
          <ul>
            <li onClick={() => openPageProfile(1)} className={isProfileContent===1?'active-selector' : ""}> <Icon.PersonCheckFill className="person-ico" /> Profil</li>
            <li onClick={() => openPageProfile(2)} className={isProfileContent===2?'active-selector' : ""}><Icon.CashStack className="person-ico" /> Abunəlik</li>
            <li onClick={() => openPageProfile(3)} className={isProfileContent===3?'active-selector' : ""}> <Icon.GearFill className="person-ico" /> Parametrlər</li>

          </ul>
        </div>
        <div className="sign-out">
          <Button>Çıxış et</Button>
        </div>
      </div>
      <hr style={{color:"gray"}} />
      <div  className={isProfileContent===1?"active-page-content": "pr-page"}>
         <ProfileContent/>
      </div>
      <div  className={isProfileContent===2?"active-page-content": "pr-page"}>
         <PricingPlan/>
      </div>
      <div  className={isProfileContent===3?"active-page-content": "pr-page"}>
         <SettingProfile/>
      </div>
      
    </section>
  )
}

export default ProfilePage