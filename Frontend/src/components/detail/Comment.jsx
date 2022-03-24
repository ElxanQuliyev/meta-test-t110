import React, { useState } from "react";
import "./comment.scss";
import personOne from "../../assets/image/person1.jpg";
import Button, { ButtonLight } from "../button/Button";
const Comment = () => {
  let [isSpoler, SetSpoiler] = React.useState(false);
let spoilerOpen = () => {
  SetSpoiler(true);
} 
  return (
    <section className="comment">
      <div className="container">
        <div className="head-comment">
          <h1>Şərhlər</h1>
        </div>
        <div className="all-comment">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
              <div className={isSpoler===true?"spoiler no-active" : "spoiler"}>
                <div className="col-12">
                  <div  className="txt-spoiler">
                    <h5>
                      Bu şərhdə spoiler var oxumaq üçün <button onClick={spoilerOpen}>toxunun</button>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="comment-content">
              <div className="person-about">
                <img src={personOne} alt="" className="profil-photo" />
                <h3 className="profil-name">Aygun huseynova</h3>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe cupiditate deleniti incidunt voluptate
                  debitis quisquam recusandae consequuntur! amet consectetur
                  adipisicing elit. A, necessitatibus! Cum, autem!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="load-more">
          <p>Daha çox</p>
        </div>
        <div className="write-comment">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <form>
              <textarea
                placeholder="rəy bildir...."
                draggable="false"
              ></textarea>
              <p><input type="checkbox" className="check-box"/> spoiler var?</p>
              <input type="submit" value="Göndər" className="send-comment" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
