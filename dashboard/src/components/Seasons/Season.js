import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSeason } from "../../Redux/Actions/SeasonsAction";
const Season = (props) => {
  const { season, tvshowId } = props;
  console.log(season);
  const dispatch = useDispatch();
  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteSeason(id, tvshowId));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap pt-2">
            <img src={season.main_picture} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate text-center my-2">
              {season.name} Sezon
            </Link>
            <div className="row justify-content-center">
              <Link
                to={`/season/${season.id}/${tvshowId}/edit`}
                className="btn btn-sm btn-outline-success p-2 mb-3  pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>

              <Link
                to={`/episodes/${season.id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 mb-3 col-md-6"
              >
                <i class="fad fa-bezier-curve"></i>
              </Link>

              <Link
                to="#"
                onClick={() => deletehandler(season.id)}
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

export default Season;
