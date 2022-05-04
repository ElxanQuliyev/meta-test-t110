import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSerie } from "../../Redux/Actions/SerieAction";

const Series = (props) => {
  const { serie } = props;
  const dispatch = useDispatch();
  const deletehandler = (id) => {
      if (window.confirm("Are you sure??")) {
        dispatch(deleteSerie(id));
      }
    };

  return (
    <>  
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap pt-2">
            <img src={serie.main_picture} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {serie.name}
            </Link>
            <div className="price mb-2">${serie.price}</div>
            <div className="row justify-content-center">
              <Link
                to={`/serie/${serie.id}/edit`}
                className="btn btn-sm btn-outline-success p-2 mb-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to={`/serie/${serie.id}/edit`}
                className="btn btn-sm btn-outline-success mb-2 p-2 pb-3 col-md-6"
              >
                <i class="fas fa-icicles"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(serie.id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Series;
