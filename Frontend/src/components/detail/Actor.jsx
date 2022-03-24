import React from 'react';
import * as Icon from "react-bootstrap-icons";
import './actor.scss';
import actorOne from '../../assets/image/actor-1.jpg';
const Actor = () => {
  return <section className='actors'>
    <div className="container">
      <div className="actor-head">
        <h1>Aktyorlar</h1>
      </div>
      <div className="row align-items-center justify-content-space-between">
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src={actorOne} alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src={actorOne} alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src={actorOne} alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src={actorOne} alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src={actorOne} alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src="https://m.media-amazon.com/images/M/MV5BZjA4NDUwMzEtYjZlYi00OTM1LTk1NjEtZWVlMzVhMTgzNzJkXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_UY317_CR14,0,214,317_AL_.jpg" alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src="https://m.media-amazon.com/images/M/MV5BZjg1ODkyYWYtOTE2Ni00ZTJhLWJhM2QtNjgxMDIxNWZiMTUwXkEyXkFqcGdeQXVyMTEzNjczNDEx._V1_UX214_CR0,0,214,317_AL_.jpg" alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <div className="actor-card">
            <img src="https://m.media-amazon.com/images/M/MV5BODNlYjVjZjAtMjRhNC00NWM1LThjYTgtOWQwMTQ5MGJhMmU1XkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_UY317_CR8,0,214,317_AL_.jpg" alt="" />
            <h5>Hoyeon</h5>
          </div>
        </div>
        
      </div>
    </div>
      </section>;
};

export default Actor;

