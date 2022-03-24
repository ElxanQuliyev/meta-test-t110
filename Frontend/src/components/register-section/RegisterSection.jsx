import React from "react";
import "./register-section.scss";
import { Link} from "react-router-dom";

const RegisterSection = (props) => {
  return (
    <section className="register-button">
  <div className="container">
      <div className="all">
       
        <div id="reg-over">
          <div id="mask">
           <div className="register">
           <Link className="sign-up" to='/'>{props.name}</Link>
           </div>
           <div className="txt">
             <h1>MetaFlix Orjinal kontentlər</h1>
           </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  
  );
};

export default RegisterSection;
