import React from 'react'
import {  NavLink } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from '../button/Button';
import './favorite.scss';
const Favorite = () => {
  return (
    <section className='favorite'>
         <div className="profile-favorite">
        <div className="container">
          <div className="favorite-head">
            <h1>Favorilərim</h1>
          </div>
         <div className="container">
         <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg&f=1&nofb=1" alt="" />
                  <NavLink to="/"><Icon.PlayCircleFill className='favorite-play-ico'/></NavLink>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.traileraddict.com%2Fcontent%2Fmillennium-films%2F211-poster.jpg&f=1&nofb=1" alt="" />
                  <NavLink to="/Detail/1"><Icon.PlayCircleFill className='favorite-play-ico'/></NavLink>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcafmp.com%2Fwp-content%2Fuploads%2F2016%2F04%2FAvatar.jpg&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.arthipo.com%2Fimage%2Fcache%2Fcatalog%2Fposter%2Fmovie%2F759-1554%2Fpfilm1491-hacker_7cf19a97-poster-movie-film-1000x1000.jpg&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2Feadee997221175.5ec00e9150a29.png&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2Fproxy%2FtQQQyBnwyrA1pX-PQYzsOZ-9y0MUXpmycX4GCJgNcfJih45vL9CQrZz-ZOMWbRFABUIEoEjslf1KkZpr9ZN91Pebq9HCeGc1qci7gbRE9JaJE8fOZQvfadM3JQWGMSkT1B4pQOMh09t1qgjid5WTeUlX1eTgdbg987M82tgft0ZdTNu9eW8%3Ds0-d&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgraphicdesignjunction.com%2Fwp-content%2Fuploads%2F2012%2F05%2Flarge%2Fmovie-poster-10.jpg&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.WNG-8RneNiMl82zu9ed3lgHaKg%26pid%3DApi&f=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="favorite-card">
                <div className="favorite-card-img">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fposterspy.com%2Fwp-content%2Fuploads%2F2019%2F08%2Fp2549543784-1500x2100.jpg&f=1&nofb=1" alt="" />
                  <Icon.PlayCircleFill className='favorite-play-ico'/>
                </div>
                <div className="favorite-card-text">
                    <h3>Squid Game</h3>
                    <div className="favorite-category">
                      <ul>
                        <li>Qorxu</li>
                        <li>Komedi</li>
                        <li>Aksiyon</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="load-more">
            <div className="d-flex justify-content-center align-items-center">
            <Button className="load-btn">Daha çox</Button>
            </div>
          </div>
         </div>
        </div>
      </div>
    </section>
  )
}

export default Favorite