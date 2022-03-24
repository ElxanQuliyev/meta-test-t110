import React from "react";
import "./filter.scss";
import * as Icon from "react-bootstrap-icons";

const Filter = () => {
  return (
    <div className="container">
      <div className="filter">
        <div className="container">
          <form>
            
              <div className="search">
              <input
              type="search"
              className="search-inp"
              placeholder="axtar..."
            />
              

              </div>
              
          </form>
          <Icon.Search className="search-ico"/>
        </div>
      </div>
    </div>
  );
};

export default Filter;
