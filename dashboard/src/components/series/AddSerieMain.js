import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SERIE_CREATE_RESET } from "../../Redux/Constants/SeriesConstants";
import {
  createSerie,
} from "../../Redux/Actions/SerieAction";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listLanguage } from "../../Redux/Actions/LanguageActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Select from "react-select";
import { listCatalogs } from "../../Redux/Actions/CatalogActions";
import { listPlatforms } from "../../Redux/Actions/PlatformActions";
import { listActors } from "../../Redux/Actions/ActorActions";
import { listDirectors } from "../../Redux/Actions/DirectorActions";
import { contentTypeList } from "../../Redux/Actions/ContentTypeActions";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddSerieMain = () => {
  const dispatch = useDispatch();
  const [seriesInfo, setSeriesInfo] = useState([
    {
      lang_code: "",
      name: "",
      description: "",
    },
    {
      lang_code: "",
      name: "",
      description: "",
    },
    {
      lang_code: "",
      name: "",
      description: "",
    },
    {
      lang_code: "",
      name: "",
      description: "",
    },
  ]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [directorIds, setDirectorIds] = useState([]);
  const [actorIds, setActorIds] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [isSlider, setIsSlider] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [trailerName, setTrailerName] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imdb, setImdb] = useState("");
  const [catalogIds, setCatalogIds] = useState([]);
  const [platformId, setPlatformId] = useState(null);
  const [mainClaim, setMainClaim] = useState("");
  const [contentTypeId, setContentTypeId] = useState("");

  const [age, setAge] = useState(18);
  const [price, setPrice] = useState(0);
  // const [videoUrl, setVideoUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [mainBack, setMainBack] = useState("");
  const productCreate = useSelector((state) => state.productCreate);
  const categorInfo = useSelector((state) => state.categoryList);
  const catalogInfo = useSelector((state) => state.catalogList);
  const platformInfo = useSelector((state) => state.platformList);
  const actorInfo = useSelector((state) => state.actorList);
  const directorInfo = useSelector((state) => state.directorList);
  const languageInfo = useSelector((state) => state.languageList);
  const contentTypeInfo = useSelector((state) => state.contentType);


  // const imageUpload = useSelector((state) => state.filmMainImage);
  // const backgroundUpload = useSelector((state) => state.filmBackground);
  // const { imageLoading, mainPicture } = imageUpload;
  // const { backgroundLoading, backgroundImage } = backgroundUpload;
  const { languages } = languageInfo ?? [];
  const { categories } = categorInfo;
  const { actors } = actorInfo;
  const { directors } = directorInfo;
  const { catalogs } = catalogInfo;
  const { platforms } = platformInfo;
  const { contentType } = contentTypeInfo;
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Series Added", ToastObjects);
      dispatch({ type: SERIE_CREATE_RESET });
      setCategoryIds([]);
      setActorIds([]);
      setDirectorIds([]);
      setSeriesInfo([]);
      setCategoryIds([]);
      setTrailerName("");
      setTrailerUrl("");
      setTrailers([]);
      setAge(0);
      setImdb("");
      setFeatured("");
      setPrice(0);
    }
  }, [product, dispatch]);

  useEffect(() => {
    dispatch(listCategories("AZ"));
    dispatch(listActors());
    dispatch(listDirectors());
    dispatch(listCatalogs("AZ"));
    dispatch(listLanguage());
    dispatch(listPlatforms());
    dispatch(contentTypeList("AZ"));
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSerie({
        price,
        categories:categoryIds,
        language:seriesInfo,
        platform:platformId,
        catalogs: catalogIds,
        age,
        claims:mainClaim,
        is_featured:featured,
        is_slider:isSlider,
        imdb,
        trailers,
        actors:actorIds,
        directors:directorIds,
        content_type:contentTypeId,
        // url:videoUrl,
        main_picture:"",
        slider_image:""
        },
        { mainImg, mainBack }
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
  const handleBackgroundUpload = (file) => {
    setMainBack(file);
    previewFile(file, setPreviewBackground);
  };
  

  const handleChangePrice = (price) => {
    if (Number(price) >= 0 || typeof price !== "undefined") {
      setMainClaim("");
    }
    setPrice(parseFloat(price));
  };

  const handleChangeCategory = (option) => {
    setCategoryIds([]);
    option.map((c) => setCategoryIds((prev) => [...prev, c.id]));
  };

  const handleChangeActors = (option) => {
    setActorIds([]);
    option.map((c) => setActorIds((prev) => [...prev, c.id]));
  };

  const handleChangeDirectors = (option) => {
    setDirectorIds([]);
    option.map((c) => setDirectorIds((prev) => [...prev, c.id]));
  };

  const handleChangeCatalog = (option) => {
    setCatalogIds([]);
    option.map((c) => setCatalogIds((prev) => [...prev, c.id]));
  };
  const handleChangeLanguage = (e, i, l) => {
    const { name, value } = e.target;
    const newState = [...seriesInfo];
    newState[i] = {
      ...newState[i],
      lang_code: l,
      [name]: value,
    };
    setSeriesInfo(newState);
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
            <Link to="/products" className="btn btn-danger text-white">
              Go to Series
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
                    <label className="form-label">Types</label>
                    <select
                      defaultValue={"DEFAULT"}
                      className="form-control"
                      onChange={(e) => setContentTypeId({id:e.target.value.split("-")[0],name:e.target.value.split("-")[1]})}
                    >
                      <option value="DEFAULT" disabled>
                        Type ...
                      </option>
                      {contentType &&
                        contentType.map((p) => (
                          <option value={`${p.id}-${p.name}`} key={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Platforms</label>
                    <select
                      defaultValue={"DEFAULT"}
                      className="form-control"
                      onChange={(e) => setPlatformId(e.target.value)}
                    >
                      <option value="DEFAULT" disabled>
                        Platform ...
                      </option>
                      {platforms &&
                        platforms.map((p) => (
                          <option value={p.id} key={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <Tabs>
                    {languages && seriesInfo.length>0 &&
                      languages.map((l, index) => (
                        <Tab
                          eventKey={l.name}
                          title={l.name}
                          key={`serie-tab-${l.id}`}
                        >
                          <div className="mb-4">
                            <label
                              htmlFor={`SERIE_title-${l.id}`}
                              className="form-label"
                            >
                              serie title {l.name}
                            </label>
                            <input
                              type="text"
                              placeholder="Type here"
                              className="form-control"
                              id={`SERIE_title-${l.id}`}
                              name="name"
                              required
                              value={seriesInfo[index].name}
                              onChange={(e) =>
                                handleChangeLanguage(e, index, l.name)
                              }
                            />
                          </div>

                          <div className="mb-4">
                            <label className="form-label">Description</label>
                            <textarea
                              id={`serie_desc-${l.id}`}
                              placeholder="Type here"
                              className="form-control"
                              name={`description`}
                              rows="7"
                              value={seriesInfo[index].description}
                              onChange={(e) =>
                                handleChangeLanguage(e, index, l.name)
                              }
                            ></textarea>
                          </div>
                        </Tab>
                      ))}
                  </Tabs>
                  <div className="mb-4">
                    <label htmlFor="categories" className="form-label">
                      Categories
                    </label>
                    {categories && (
                      <Select
                        onChange={handleChangeCategory}
                        isMulti={true}
                        options={categories}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="catalogs" className="form-label">
                      Catalogs
                    </label>
                    {catalogs && (
                      <Select
                        onChange={handleChangeCatalog}
                        isMulti={true}
                        options={catalogs}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="SERIE_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="SERIE_price"
                      min={0}
                      value={price}
                      onChange={(e) => handleChangePrice(e.target.value)}
                    />
                  </div>
                  {(price === 0 || typeof price==="undefined")? (
                      <div className="mb-4">
                        <label htmlFor="plan" className="form-label">
                          Plan
                        </label>
                        <select className="form-control" defaultValue={""} onChange={e=>setMainClaim(e.target.value)}>
                          <option  value={""}>-</option>
                          <option value="Free">Free</option>
                          <option value="Subscriber">Subscriber</option>
                          <option value="UnSubscriber">UnSubscriber</option>
                          <option value="Pro">Pro</option>
                        </select>
                      </div>
                    ):null}

                  <div className="mb-4">
                    <label htmlFor="serie_age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="serie_age"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="serie_imdb" className="form-label">
                      IMDB
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="serie_imdb"
                      value={imdb}
                      onChange={(e) => setImdb(e.target.value)}
                    />
                  </div>
{/* 
                  <div className="mb-4">
                    <label htmlFor="serie_url" className="form-label">
                      Video Url
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="serie_url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div> */}
                  <div className="mb-4">
                    <label htmlFor="actors" className="form-label">
                      Actors
                    </label>
                    {actors && (
                      <Select
                        onChange={handleChangeActors}
                        isMulti={true}
                        id="actors"
                        options={actors}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="directors" className="form-label">
                      Directors
                    </label>
                    {directors && (
                      <Select
                        onChange={handleChangeDirectors}
                        isMulti={true}
                        id="directors"
                        options={directors}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                      />
                    )}
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
                  <div className="mb-4">
                    <label className="form-label">Background Images</label>
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) =>
                        handleBackgroundUpload(e.target.files[0])
                      }
                    />
                    {previewBackground ? (
                      
                      <img width={150} src={previewBackground} alt="" />
                    ):null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="serie_featured"
                      className="form-check-label me-2"
                    >
                      Önə çıxarılsın?
                    </label>
                    <input
                      type="checkbox"
                      placeholder="Type here"
                      className="form-check-input"
                      id="serie_featured"
                      value={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="serie_slider"
                      className="form-check-label me-2"
                    >
                      Slider hissəsində göstərilsin?
                    </label>
                    <input
                      type="checkbox"
                      placeholder="Type here"
                      className="form-check-input"
                      id="serie_slider"
                      value={isSlider}
                      onChange={(e) => setIsSlider(e.target.checked)}
                    />
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="mb-4 ">
                      <label htmlFor={`serie_trailer`} className="form-label">
                        Trailer Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`serie_trailer`}
                        name="serie_trailer"
                        value={trailerName}
                        onChange={(e) => setTrailerName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 ms-2 flex-grow-1">
                      <label
                        htmlFor={`serie_trailer_url`}
                        className="form-label"
                      >
                        Trailer Url
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id={`serie_trailer_url`}
                        name="serie_trailer_url"
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

export default AddSerieMain;
