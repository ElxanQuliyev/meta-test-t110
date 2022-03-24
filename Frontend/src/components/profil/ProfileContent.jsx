import React from 'react'
import * as Icon from "react-bootstrap-icons";
import headBg from '../../assets/image/head-bg.jpg'
import './profile-content.scss'
import Watching from './Watching';
import Favorite from './Favorite';
const ProfileContent = () => {
  return (
    <section className='profileContent'>
          <div className="profile-content-description">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div style={{backgroundImage: `url(${headBg})`}} className="profile-content-card">
                 <div className="txt-profile">
                 <div className="d-flex justify-content-between align-items-center">
                <div className="left">
                  <h2>Premium Plan</h2>
                  <p>20Azn</p>
                </div>
                <div className="right">
                  <Icon.CreditCard2Back className='pricing-packet-ico-money'/>
                </div>
                </div>
                 </div>
            
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div style={{backgroundImage: `url(${headBg})`}} className="profile-content-card">
                 <div className="txt-profile">
                 <div className="d-flex justify-content-between align-items-center">
                <div className="left">
                  <h2>Son Ödəniş</h2>
                  <p>27.01.2022</p>
                </div>
                <div className="right">
                  <Icon.CalendarEvent className='pricing-packet-ico-money'/>
                </div>
                </div>
                 </div>
            
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div style={{backgroundImage: `url(${headBg})`}} className="profile-content-card">
                 <div className="txt-profile">
                 <div className="d-flex justify-content-between align-items-center">
                <div className="left">
                  <h2>Favorilərim</h2>
                  <p>300</p>
                </div>
                <div className="right">
                  <Icon.Star className='pricing-packet-ico-money'/>
                </div>
                </div>
                 </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <Watching/>
      <Favorite/>
     
    </section>
  )
}

export default ProfileContent