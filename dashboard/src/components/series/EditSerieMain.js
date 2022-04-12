import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listLanguage } from "../../Redux/Actions/LanguageActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { listActors } from "../../Redux/Actions/ActorActions";
import { listDirectors } from "../../Redux/Actions/DirectorActions";
import { listCatalogs } from "../../Redux/Actions/CatalogActions";
import { listPlatforms } from "../../Redux/Actions/PlatformActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditSerieMain = (props) => {
  const { productId } = props;
  const [categoryIds, setCategoryIds] = useState([]);
  const [catalogIds, setCatalogIds] = useState([]);
  const [directorIds, setDirectorIds] = useState([]);
  const [actorIds, setActorIds] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [isSlider, setIsSlider] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [trailerName, setTrailerName] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imdb, setImdb] = useState("");
  const [platformId, setPlatformId] = useState(null);
  const [mainClaim, setMainClaim] = useState("");
  const [age, setAge] = useState(18);
  const [price, setPrice] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [time, setTime] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [mainBack, setMainBack] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);

  const { loading, error, product } = productEdit;

  const [movieInfo, setmovieInfo] = useState([]);
  const productUpdate = useSelector((state) => state.productUpdate);
  const categorInfo = useSelector((state) => state.categoryList);
  const catalogInfo = useSelector((state) => state.catalogList);
  const platformInfo = useSelector((state) => state.platformList);
  const actorInfo = useSelector((state) => state.actorList);
  const directorInfo = useSelector((state) => state.directorList);
  const languageInfo = useSelector((state) => state.languageList);

  const { languages } = languageInfo ?? [];
  const { categories } = categorInfo;
  const { actors } = actorInfo;
  const { directors } = directorInfo;
  const { catalogs } = catalogInfo;
  const { platforms } = platformInfo;
  const { data } = product;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Movie Updated", ToastObjects);
    } else {
      if (!data || data.id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setPrice(data.price);
        setmovieInfo([...data.language]);
        setCategoryIds([...data.categories]);
        setCatalogIds([...data.catalogs]);
        setDirectorIds([...data.directors]);
        setActorIds([...data.actors]);
        setTrailers([...data.trailers]);
        setPlatformId(data.platform);
        setTime(data.time);
        setVideoUrl(data.url);
        setAge(data.age);
        setImdb(data.imdb);
        setIsSlider(data.is_slider);
        setFeatured(data.is_featured);
        setPrice(data.price);
        setMainClaim(data.claims);
        setPreviewImage(data.main_picture);
        setPreviewBackground(data.slider_image);
        dispatch(listCategories("AZ"));
        dispatch(listActors());
        dispatch(listDirectors());
        dispatch(listCatalogs("AZ"));
        dispatch(listLanguage());
        dispatch(listPlatforms());
      }
    }
  }, [data, dispatch, productId, successUpdate]);
  const handleChangeCategory = (option) => {
    setCategoryIds([]);
    option.map((c) => setCategoryIds((prev) => [...prev, c]));
  };
  const handleChangeActors = (option) => {
    setActorIds([]);
    option.map((c) => setActorIds((prev) => [...prev, c.id]));
  };

  // const handleChangePlatforms = (option) => {
  //   setActorIds([]);
  //   option.map((c) => setActorIds((prev) => [...prev, c.id]));
  // };

  console.log(platformId);
  const handleChangeDirectors = (option) => {
    setDirectorIds([]);
    option.map((c) => setDirectorIds((prev) => [...prev, c]));
  };
  const handleChangeCatalog = (option) => {
    setCatalogIds([]);
    option.map((c) => setCatalogIds((prev) => [...prev, c]));
  };
  const handleChangeLanguage = (e, i, l) => {
    const { name, value } = e.target;
    const newState = [...movieInfo];
    newState[i] = {
      ...newState[i],
      lang_code: l,
      [name]: value,
    };
    setmovieInfo(newState);
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
    if (parseFloat(price) >= 0 || typeof price !== "undefined") {
      setMainClaim("");
    }
    setPrice(parseFloat(price));
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
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(
        {
          id: productId,
          price,
          categories: categoryIds.map((c) => c.id),
          language: movieInfo,
          main_picture: data.main_picture,
          slider_image: data.slider_image,
          platform: platformId,
          catalogs: catalogIds.map((c) => c.id),
          age,
          claims: mainClaim,
          is_featured: featured,
          is_slider: isSlider,
          imdb,
          trailers,
          actors: actorIds.map((c) => c.id),
          directors: directorIds.map((c) => c.id),
          url: videoUrl,
          time,
        },
        { mainImg, mainBack }
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to movies
            </Link>
            <h2 className="content-title">Update Movie</h2>
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
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      {platforms && (
                        <div className="mb-4">
                          <label className="form-label">Platforms</label>
                          <Select
                            onChange={(e) => setPlatformId(e.id)}
                            id="platform"
                            options={platforms}
                            defaultValue={platformId}
                            getOptionLabel={(opt) => opt.name}
                            getOptionValue={(opt) => opt.id}
                          />
                        </div>
                        )}
                      <Tabs>
                        {languages &&
                          movieInfo.length > 0 &&
                          languages.map((l, index) => (
                            <Tab
                              eventKey={l.name}
                              title={l.name}
                              key={`movie-tab-${l.id}`}
                            >
                              <div className="mb-4">
                                <label
                                  htmlFor={`product_title-${l.id}`}
                                  className="form-label"
                                >
                                  Movie title {l.name}
                                </label>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="form-control"
                                  id={`product_title-${l.id}`}
                                  name="name"
                                  required
                                  value={movieInfo[index].name}
                                  onChange={(e) =>
                                    handleChangeLanguage(e, index, l.name)
                                  }
                                />
                              </div>

                              <div className="mb-4">
                                <label className="form-label">
                                  Description
                                </label>
                                <textarea
                                  id={`movie_desc-${l.id}`}
                                  placeholder="Type here"
                                  className="form-control"
                                  name={`description`}
                                  rows="7"
                                  value={movieInfo[index].description}
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
                        {categoryIds.length > 0 && (
                          <Select
                            onChange={handleChangeCategory}
                            isMulti={true}
                            options={categories}
                            defaultValue={categoryIds}
                            getOptionLabel={(opt) => opt.name}
                            getOptionValue={(opt) => opt.id}
                          />
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="catalogs" className="form-label">
                          Catalogs
                        </label>
                        {catalogIds.length > 0 && (
                          <Select
                            onChange={handleChangeCatalog}
                            isMulti={true}
                            options={catalogs}
                            defaultValue={catalogIds}
                            getOptionLabel={(opt) => opt.name}
                            getOptionValue={(opt) => opt.id}
                          />
                        )}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          min={0}
                          value={price}
                          onChange={(e) => handleChangePrice(e.target.value)}
                        />
                      </div>
                      {price === 0 || typeof price === "undefined" ? (
                        <div className="mb-4">
                          <label htmlFor="plan" className="form-label">
                            Plan
                          </label>
                          <select
                            className="form-control"
                            defaultValue={data ? data.claims : ""}
                            onChange={(e) => setMainClaim(e.target.value)}
                          >
                            <option value={""}>-</option>
                            <option value="Free">Free</option>
                            <option value="Subscriber">Subscriber</option>
                            <option value="UnSubscriber">UnSubscriber</option>
                            <option value="Pro">Pro</option>
                          </select>
                        </div>
                      ) : null}
                      <div className="mb-4">
                        <label htmlFor="movie_age" className="form-label">
                          Age
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="movie_age"
                          required
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="movie_imdb" className="form-label">
                          IMDB
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="movie_imdb"
                          value={imdb}
                          onChange={(e) => setImdb(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="movie_url" className="form-label">
                          Video Url
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="movie_url"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="movie_url" className="form-label">
                          Time
                        </label>
                        <input
                          type="string"
                          placeholder="2:00"
                          className="form-control"
                          id="movie_time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="actors" className="form-label">
                          Actors
                        </label>
                        {actorIds.length > 0 && (
                          <Select
                            onChange={handleChangeActors}
                            isMulti={true}
                            id="actors"
                            options={actors}
                            defaultValue={actorIds}
                            getOptionLabel={(opt) => opt.name}
                            getOptionValue={(opt) => opt.id}
                          />
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="directors" className="form-label">
                          Directors
                        </label>
                        {directorIds.length > 0 && (
                          <Select
                            onChange={handleChangeDirectors}
                            isMulti={true}
                            id="directors"
                            options={directors}
                            defaultValue={directorIds}
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
                        {!previewImage ? (
                          <img
                            width={150}
                            //  src={data.main_picture}
                            alt=""
                          />
                        ) : (
                          <img width={150} src={previewImage} alt="" />
                        )}
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
                        {!previewBackground ? (
                          // <img width={150} src={data.slider_image} alt="" />
                          <img />
                        ) : (
                          <img width={150} src={previewBackground} alt="" />
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="movie_featured"
                          className="form-check-label me-2"
                        >
                          Önə çıxarılsın?
                        </label>
                        <input
                          type="checkbox"
                          placeholder="Type here"
                          className="form-check-input"
                          id="movie_featured"
                          value={featured}
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="movie_slider"
                          className="form-check-label me-2"
                        >
                          Slider hissəsində göstərilsin?
                        </label>
                        <input
                          type="checkbox"
                          placeholder="Type here"
                          className="form-check-input"
                          id="movie_slider"
                          value={isSlider}
                          checked={isSlider}
                          onChange={(e) => setIsSlider(e.target.checked)}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="mb-4">
                          <label
                            htmlFor={`movie_trailer`}
                            className="form-label"
                          >
                            Trailer Name
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id={`movie_trailer`}
                            name="movie_trailer"
                            value={trailerName}
                            onChange={(e) => setTrailerName(e.target.value)}
                          />
                        </div>

                        <div className="mb-4 ms-2 flex-grow-1">
                          <label
                            htmlFor={`movie_trailer_url`}
                            className="form-label"
                          >
                            Trailer Url
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id={`movie_trailer_url`}
                            name="movie_trailer_url"
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditSerieMain;
