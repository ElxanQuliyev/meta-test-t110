import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  platformCreate,
  updatePlatforms,
} from "../../Redux/Actions/PlatformActions";
import {
  PLATFORM_CREATE_RESET,
  PLATFORM_UPDATE_RESET,
} from "../../Redux/Constants/PlatformConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreatePlatoforms = (actInfo) => {
  const history = useHistory();

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const platformUpdate = useSelector((state) => state.platformUpdate);
  const mainplatformCreate = useSelector((state) => state.platformCreate);
  console.log(mainplatformCreate);

  const {
    loading: loadingUpdate,
    success: successUpdate,
  } = platformUpdate;
  const {
    loading: loadingCreate,
    success: successCreate,
  } = mainplatformCreate;
  useEffect(() => {
    if (successUpdate) {
      toast.success("Platform Updated", ToastObjects);
      dispatch({ type: PLATFORM_UPDATE_RESET });
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (successCreate) {
      toast.success("Platform Added", ToastObjects);
      dispatch({ type: PLATFORM_CREATE_RESET });
    }
  }, [dispatch, successCreate]);
  const platformInfo = useSelector((state) => state.platformCreate);
  const { loading, error } = platformInfo;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(platformCreate({ name }));
    actInfo.platform.id = null;
    setName("");
    history.replace("/platform");
  };
  const submitHandlerEdit = (e) => {
    e.preventDefault();
    dispatch(updatePlatforms(actInfo.platform.id, { name }));
    actInfo.platform.id = null;
    setName("");
    history.replace("/platform");
  };
  useEffect(() => {
    if (actInfo.platform.id) {
      setName(actInfo.platform.name);
    }
  }, [actInfo.platform, actInfo]);
  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form
          onSubmit={actInfo.platform.id ? submitHandlerEdit : submitHandler}
        >
          {error && <Message variant="alert-danger">{error}</Message>}
          {loadingUpdate && <Loading />}
          {loading && <Loading />}
          {loadingCreate && <Loading />}
          <div className="mb-4">
            <label htmlFor={`PLATFORM_title`} className="form-label">
            Platform title
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control"
              id={`PLATFORM_title`}
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
            <div className="d-grid">
            {actInfo.platform.id ? (
              <>
                <button className="btn btn-warning py-3 mb-3" type="submit">
                  Edit Platform
                </button>
                <button
                  onClick={() => {
                    setName("");
                    actInfo.platform.id = null;
                    history.replace("/platform");
                  }}
                  className="btn btn-secondary py-3"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary py-3">
                Create platform
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePlatoforms;
