import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./premium.scss";

const Premium = () => {
  return (
    <section className="premium-content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="text">
              <h1>
                Premiuma keçid edin <Link to="/SignUp">Premium keçid</Link>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;
