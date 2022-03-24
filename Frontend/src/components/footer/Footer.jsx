import React from "react";
import "./footer.scss";
import { Link} from "react-router-dom";
import footerİmg from "../../assets/image/footer.jpg";
import * as Icon from "react-bootstrap-icons";
import logo from "../../assets/image/MetaWhiteSvg.svg";
import appStore from "../../assets/image/appStore.png";
import androidStore from "../../assets/image/google.png";
import master from "../../assets/image/master.png";
import golden from "../../assets/image/golden.png";
import milli from "../../assets/image/milli.svg";

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footerİmg})` }}>
      <div className="footer-head">
        <div className="d-fl container justify-content-between align-items-center">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="right">
            <div className="pages">
              <ul className="list-unstyled m-0">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-4 col-lg-4 col-md-4 col-xl-4">
                    <li>
                      <Link to="/MetaFlixOrjinal">MetaFlix</Link>
                    </li>
                  </div>
                  <div className="col-sm-4 col-4 col-lg-4 col-md-4 col-xl-4">
                    <li>
                      <Link to="/CinemaLab">CinemaLab</Link>
                    </li>
                  </div>

                  <div className="col-sm-4 col-4 col-lg-4 col-md-4 col-xl-4">
                    <li>
                      <Link to="/Platformalar">Platformalar</Link>
                    </li>
                  </div>
                </div>
              </ul>
            </div>

            <div className="lang">
              <Icon.Globe className="lang-ico" />
              <select name="" id="">
                <option value="">Azerbaijan</option>
                <option value="">English</option>
                <option value="">Russian</option>
              </select>
            </div>
          </div>
        </div>
        <hr style={{ color: "#fff" }} />
        <div className="technical container">
          <ul className=" m-0 list-unstyled">
              <div className="row align-items-center justify-content-center">
              <div className="col-4 col-sm-4 col-lg-3 col-md-3 col-xl-3">
              <li>
                <Link to="/">Təkliflər</Link>
              </li>
            </div>

            <div className="col-4 col-sm-4 col-lg-3 col-md-3 col-xl-3">
              <li>
                <Link to="/">Haqqımızda</Link>
              </li>
            </div>

            <div className="col-4 col-sm-4 col-lg-3 col-md-3 col-xl-3">
              <li>
                <Link to="/">Məxfilik</Link>
              </li>
            </div>

            <div className="col-4 col-sm-4 col-lg-3 col-md-3 col-xl-3">
              <li>
                <Link to="/">Əlaqə</Link>
              </li>
            </div>
              </div>
          </ul>
          <div className="social-icons">
            <ul>
              <li>
                <Link to="/">
                  <Icon.Instagram className="soci-ico" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Icon.Youtube className="soci-ico" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Icon.Twitter className="soci-ico" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Icon.Facebook className="soci-ico" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="websuper container">
          <div className="left">
            <h5>
              <Link to="/">
                <Icon.PatchCheckFill /> WebSuper Agency
              </Link>{" "}
              tərəfindən yaradılıb
            </h5>
          </div>
          <div className="device-ico">
            <Link to="/">
              <img src={androidStore} alt="" />
            </Link>
            <Link to="/">
              <img className="app-store" src={appStore} alt="" />
            </Link>
          </div>
        </div>
        <hr style={{ color: "#fff" }} />
        <div className="pay-method">
          <div className="left-content">
            <p>
              Müəllif hüquqları üçün təklif və iradlar bölməsindən müraciət edə
              bilərsiniz
            </p>
          </div>
          <div className="pay">
            <img src={master} alt="" />
            <img className="golden" src={golden} alt="" />
            <img src={milli} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
