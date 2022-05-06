import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEpisode } from "../../Redux/Actions/EpisodeActions";
const  Episode= (props) => {
  const { episode,seasonId } = props;
  console.log(episode)
  const dispatch = useDispatch();
  const deletehandler = (id) => {
      if (window.confirm("Are you sure??")) {
        dispatch(deleteEpisode(id,seasonId));
      }
    };

  return (
    <>  
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap pt-2">
            <img src={episode.main_picture} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate text-center my-2">
              {episode.name}
            </Link>
            <div className="row justify-content-center">
              <Link
                to={`/episode/${episode.id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(episode.id)}
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

export default Episode;
