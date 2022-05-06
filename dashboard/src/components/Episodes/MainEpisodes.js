import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Episode from "./Episode";
import { listEpisode } from "../../Redux/Actions/EpisodeActions";

const MainEpisodes= ({seasonId}) => {
  console.log(seasonId)
  const dispatch = useDispatch();
  const episodeList = useSelector((state) => state.episodeList);
  const { loading, error, episodes } = episodeList;
  const episodeDelete = useSelector((state) => state.episodeDelete);
  const { error: errorDelete, success: successDelete } = episodeDelete;
  
  useEffect(() => {
    dispatch(listEpisode(seasonId,"AZ"));
    // dispatch(listSeason(tvshowId))
  }, [dispatch, successDelete,seasonId]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Episodes</h2>
      </div>

      <div className="card mb-4 shadow-sm">
      <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-3 col-6 col-md-3">
            <Link  to={`/addEpisode/${seasonId}`} className="btn btn-primary">
              Create new Episode
          </Link>
            </div>
            <div className="col-lg-3 col-6 col-md-3">
          <Link to={`/series/`} className="btn btn-link">
            Back to Series
          </Link>
            
          </div>
          </div>
          
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {episodes.map((episode) => (
                <Episode seasonId={episode.season_id} episode={episode} key={episode.id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainEpisodes;
