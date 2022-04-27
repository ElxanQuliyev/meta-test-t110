import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  directorCreate,
  listDirectors,
  updateDirectors,
} from "../../Redux/Actions/DirectorActions";
import {
  DIRECTOR_CREATE_RESET,
  DIRECTOR_UPDATE_RESET,
} from "../../Redux/Constants/DirectorConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateDirectors = (actInfo) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [mainPicture, setMainPicture] = useState("");

  const dispatch = useDispatch();
  const directorUpdate = useSelector((state) => state.directorUpdate);
  const mainDirectorCreate = useSelector((state) => state.directorCreate);
  console.log(mainDirectorCreate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = directorUpdate;
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = directorUpdate;
  useEffect(() => {
    if (successUpdate) {
      toast.success("Director Updated", ToastObjects);
      dispatch({ type: DIRECTOR_UPDATE_RESET });
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (successCreate) {
      toast.success("Director Added", ToastObjects);
      dispatch({ type: DIRECTOR_CREATE_RESET });
    }
  }, [dispatch, successCreate]);
  const directorInfo = useSelector((state) => state.directorCreate);
  const { loading, error } = directorInfo;
  const handleImageUpload = (file) => {
    setMainPicture(file);
    previewFile(file, setPreviewImage);
  };
  const previewFile = (file, state) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      state(reader.result);
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(directorCreate({ name, mainPicture }));
    actInfo.director.id = null;
    setName("");
    setMainPicture("");
    setPreviewImage("");
    history.replace("/director");
  };
  const submitHandlerEdit = (e) => {
    e.preventDefault();
    dispatch(updateDirectors(actInfo.director.id, { name, mainPicture }));
    actInfo.director.id = null;
    setName("");
    setMainPicture("");
    setPreviewImage("");
    history.replace("/director");
  };
  useEffect(() => {
    if (actInfo.director.id) {
      setName(actInfo.director.name);
      setPreviewImage(actInfo.director.picture);
      setMainPicture(actInfo.director.picture);
    }
  }, [actInfo.director, actInfo]);
  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form
          onSubmit={actInfo.director.id ? submitHandlerEdit : submitHandler}
        >
          {error && <Message variant="alert-danger">{error}</Message>}
          {loadingUpdate && <Loading />}
          {loading && <Loading />}
          {loadingCreate && <Loading />}
          <div className="mb-4">
            <label htmlFor={`director_title`} className="form-label">
              Director title
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control"
              id={`DIRECTOR_title`}
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Images</label>
            <input value={mainPicture} className="form-control" type="text" onChange={(e)=>setMainPicture(e.target.value)}/>
            <input
              className="form-control mt-3"
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            {previewImage && <img width={150} src={previewImage} alt="" />}
          </div>
          <div className="d-grid">
            {actInfo.director.id ? (
              <>
                <button className="btn btn-warning py-3 mb-3" type="submit">
                  Edit Director
                </button>
                <button
                  onClick={() => {
                    setName("");
                    actInfo.director.id = null;
                    history.replace("/director");
                  }}
                  className="btn btn-secondary py-3"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary py-3">
                Create Director
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDirectors;
