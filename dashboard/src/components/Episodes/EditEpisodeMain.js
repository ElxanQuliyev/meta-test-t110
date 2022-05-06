import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EPISODE_UPDATE_RESET } from "../../Redux/Constants/EpisodeConstants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { editEpisode, updateEpisode } from "../../Redux/Actions/EpisodeActions";
import { listLanguage } from "../../Redux/Actions/LanguageActions";
import { Tab, Tabs } from "react-bootstrap";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const EditEpisodeMain = ({ episodeId }) => {
  const dispatch = useDispatch();

  const [episodeLangInfo, setEpisodeLangInfo] = useState([]);
  const [url, setUrl] = useState("");
  const [trailers, setTrailers] = useState([]);
  const [trailerName, setTrailerName] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [mainImg, setMainImg] = useState("");

  const episodeEditInfo = useSelector((state) => state.episodeEdit);
  const { loading, error, episode } = episodeEditInfo;

  const languageInfo = useSelector((state) => state.languageList);
  const { languages } = languageInfo ?? [];

  const episodeUpdate = useSelector((state) => state.episodeUpdate);
  const {
    success: successUpdate,
  } = episodeUpdate;
  console.log(episode)
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EPISODE_UPDATE_RESET });
      toast.success("Episode Edit", ToastObjects);
    } else {
      if (!episode || episode.id !== episodeId) {
        dispatch(editEpisode(episodeId));
      } else {
         setTrailers(episode.trailers ? [...episode.trailers]:[]);
        dispatch(listLanguage());
        setEpisodeLangInfo([...episode.language]);
        setPreviewImage(episode.main_picture);
        setUrl(episode.url)
      }
    }
  }, [successUpdate, dispatch, episode, episodeId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEpisode(
        {
          language:episodeLangInfo,
          episode_id:episodeId,
          trailers,
          url,
          main_picture: episode.main_picture?? "",
        },
        { mainImg }
      )
    );
  };

  const handleChangeLanguage = (e, i, l) => {
    const { name, value } = e.target;
    const newState = [...episodeLangInfo];
    newState[i] = {
      ...newState[i],
      lang_code: l,
      [name]: value,
    };
    setEpisodeLangInfo(newState);
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
            <Link
              to={`/episodes/${episode.season_id}/getall`}
              className="btn btn-danger text-white"
            >
              Go to Episodes
            </Link>
            <h2 className="content-title">Edit Episode</h2>
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
                  
                  <Tabs>
                    {(languages || episodeLangInfo) &&
                      languages.map((l, index) => (
                        <Tab
                          eventKey={l.name}
                          title={l.name}
                          key={`movie-tab-${l.id}`}
                        >
                          <div className="mb-4">
                            <label
                              htmlFor={`episode_title-${l.id}`}
                              className="form-label"
                            >
                              episode title {l.name}
                            </label>
                            <input
                              type="text"
                              placeholder="Type here"
                              className="form-control"
                              id={`episode_title-${l.id}`}
                              name="name"
                              required
                              value={ episodeLangInfo[index].name}
                              onChange={(e) =>
                                handleChangeLanguage(e, index, l.name)
                              }
                            />
                            <div className="mb-4">
                            <label className="form-label">Description</label>
                            <textarea
                              id={`movie_desc-${l.id}`}
                              placeholder="Type here"
                              className="form-control"
                              name={`description`}
                              rows="7"
                              value={episodeLangInfo[index].description}
                              onChange={(e) =>
                                handleChangeLanguage(e, index, l.name)
                              }
                            ></textarea>
                          </div>
                          </div>
                        </Tab>
                      ))}
                  </Tabs>
                  <div className="mb-4">
                    <label className="form-label">Images</label>

                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                    {previewImage ? (
                      <img width={150} src={previewImage} alt="" />
                    ) : null}
                  </div>

                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="mb-4 ">
                      <label htmlFor={`episode_trailer`} className="form-label">
                        Trailer Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`episode_trailer`}
                        name="episode_trailer"
                        value={trailerName}
                        onChange={(e) => setTrailerName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 ms-2 flex-grow-1">
                      <label
                        htmlFor={`episode_trailer_url`}
                        className="form-label"
                      >
                        Trailer Url
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`episode_trailer_url`}
                        name="episode_trailer_url"
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
                      {trailers &&
                        trailers.map((t, id) => (
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

export default EditEpisodeMain;
