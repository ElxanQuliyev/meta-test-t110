import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SEASON_CREATE_RESET } from "../../Redux/Constants/SeasonConstants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { seasonCreate } from "../../Redux/Actions/SeasonsAction";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddSeasonMain = ({tvshowId}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [trailers, setTrailers] = useState([]);
  const [trailerName, setTrailerName] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [mainImg, setMainImg] = useState("");
  const seasonCreateInfo = useSelector((state) => state.seasonCreate);
  const { loading, error, season } = seasonCreateInfo;
  console.log(season)
  useEffect(() => {
    if (season) {
      toast.success("Season Added", ToastObjects);
      dispatch({ type: SEASON_CREATE_RESET });
      setTrailerName("");
      setTrailerUrl("");
      setTrailers([]);
      setName("")
    }
  }, [season, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      seasonCreate({
        name,
        tvshowId,
        trailers,
        main_picture:"",
        },
        { mainImg }
      )
    );
  };
  const handleImageUpload = (file) => {
    setMainImg(file);
    previewFile(file, setPreviewImage);
  };
  const previewFile = (file, state) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      state(reader.result);
    };
  };
 
  const handleRemoveTrailer = (e) => {
    const ind = Number(e.target.getAttribute("trailer-index"));
    setTrailers((ts) => ts.filter((_, i) => i !== ind));
  };
  const handleAddTrailer = (e, name, url) => {
    e.preventDefault();
    setTrailers((state) => [...state, { name, url }]);
    setTrailerName("");
    setTrailerUrl("");
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to={`/season-episode/${tvshowId}/getall`} className="btn btn-danger text-white">
              Go to Season
            </Link>
            <h2 className="content-title">Add Serie</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}

                  <div className="mb-4">
                    <label
                      htmlFor={`season_title`}
                      className="form-label"
                    >
                      Season title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id={`season_title`}
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
           
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                    {previewImage ? (
                      
                      <img width={150} src={previewImage} alt="" />
                    ):null}
                  </div>
          
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="mb-4 ">
                      <label htmlFor={`SEASON_trailer`} className="form-label">
                        Trailer Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`SEASON_trailer`}
                        name="SEASON_trailer"
                        value={trailerName}
                        onChange={(e) => setTrailerName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 ms-2 flex-grow-1">
                      <label
                        htmlFor={`SEASON_trailer_url`}
                        className="form-label"
                      >
                        Trailer Url
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`SEASON_trailer_url`}
                        name="SEASON_trailer_url"
                        value={trailerUrl}
                        onChange={(e) => setTrailerUrl(e.target.value)}
                      />
                    </div>
                    <div className="ms-5 mt-2">
                      <button
                        className="btn btn-outline-dark"
                        onClick={(e) =>
                          handleAddTrailer(e, trailerName, trailerUrl)
                        }
                      >
                        Add Trailer
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <ul className=" w-100 p-0">
                      {trailers.map((t, id) => (
                        <li
                          style={{ border: "1px solid black" }}
                          key={id}
                          className="list-group-item align-items-center justify-content-between d-flex"
                        >
                          trailer: {t.name} &nbsp;&nbsp;|&nbsp;&nbsp; url:
                          {t.url}
                          <div
                            trailer-index={id}
                            className="p-2 text-danger"
                            onClick={handleRemoveTrailer}
                          >
                            <i
                              style={{ pointerEvents: "none" }}
                              className="fas fa-times"
                            ></i>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddSeasonMain;
