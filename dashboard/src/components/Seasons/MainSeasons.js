import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSeason } from "../../Redux/Actions/SeasonsAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Season from "./Season";

const MainSeasons= ({tvshowId}) => {
  const dispatch = useDispatch();
  const [mainSeasonId, setMainSeasonId] = useState(null)

  const seasonList = useSelector((state) => state.seasonList);
  const { loading, error, seasons } = seasonList;
  const seasonDelete = useSelector((state) => state.seasonDelete);
  const { error: errorDelete, success: successDelete } = seasonDelete;
  useEffect(() => {
    dispatch(listSeason(tvshowId));
  }, [dispatch, successDelete,tvshowId]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Seasons</h2>
        <div>
          <Link to={`/add-season/${tvshowId}`} className="btn btn-primary">
            Create new Season
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
      <header className="card-header bg-white ">
          <div className="row gx-3 py-3 justify-content-between">
            <div className="col-lg-8">
            <div className="row align-items-center">
            <div className="col-lg-3 col-6 col-md-3">
            <select
                defaultValue={""}
                className="form-select"
                onChange={(e) => setMainSeasonId(e.target.value)}
              >
                <option value="" disabled>Seasons ...</option>
                {seasons &&
                  seasons.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-lg-4 col-6 col-md-3">
            <Link to={`/addEpisode/${mainSeasonId}/${tvshowId}`} className={`btn btn-primary ${mainSeasonId==null?"disabled-link":""}`}>
              Create new Episode
          </Link>
            </div>
            </div>
        
            </div>
     
            <div className="col-lg-2 col-6 col-md-3">
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
              {seasons.map((season) => (
                <Season tvshowId={tvshowId} season={season} key={season.id} />
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

export default MainSeasons;
