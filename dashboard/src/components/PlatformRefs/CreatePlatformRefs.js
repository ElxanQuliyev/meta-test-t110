import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { listCatalogs } from "../../Redux/Actions/CatalogActions";
import { contentTypeList } from "../../Redux/Actions/ContentTypeActions";
import { listPlatforms } from "../../Redux/Actions/PlatformActions";
import {
  platformRefCreate,
  updatePlatformRefs,
} from "../../Redux/Actions/PlatformRefActions";
import {
  PLATFORM_REF_CREATE_RESET,
  PLATFORM_REF_UPDATE_RESET,
} from "../../Redux/Constants/PlatformRefConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreatePlatformsRef = (actInfo) => {
  console.log(actInfo);
  const history = useHistory();

  const [maincontentType, setMaincontentType] = useState("");
  const [platform, setPlatform] = useState("");
  const [catalog, setCatalog] = useState("");

  const dispatch = useDispatch();
  const platformUpdate = useSelector((state) => state.platformRefUpdate);
  const mainplatformCreate = useSelector((state) => state.platformRefCreate);
  const platformListInfo = useSelector((state) => state.platformList);
  const { platforms } = platformListInfo;

  const { loading: loadingUpdate, success: successUpdate } = platformUpdate;
  const { loading: loadingCreate, success: successCreate } = mainplatformCreate;
  useEffect(() => {
    if (successUpdate) {
      toast.success("Platform Referance Updated", ToastObjects);
      dispatch({ type: PLATFORM_REF_UPDATE_RESET });
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (successCreate) {
      toast.success("Platform Added", ToastObjects);
      dispatch({ type: PLATFORM_REF_CREATE_RESET });
    }
  }, [dispatch, successCreate]);
  const platformInfo = useSelector((state) => state.platformCreate);
  const catalogInfo = useSelector((state) => state.catalogList);
  const { catalogs } = catalogInfo;
  const { loading, error } = platformInfo;
  const contentTypeInfo = useSelector((state) => state.contentType);
  const { contentType } = contentTypeInfo;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(platformRefCreate({ catalog, content_type:maincontentType, platform }));
    actInfo.platformRef.id = null;
    setCatalog("");
    setMaincontentType("");
    setPlatform("");
    history.replace("/platform-ref");
  };
  const submitHandlerEdit = (e) => {
    e.preventDefault();
    dispatch(
      updatePlatformRefs(actInfo.platformRef.id, {
        catalog,
        content_type:maincontentType,
        platform,
      })
    );
    actInfo.platformRef.id = null;
    setCatalog("");
    setMaincontentType("");
    setPlatform("");
    history.replace("/platform-ref");
  };
  useEffect(() => {
    dispatch(listPlatforms());
    dispatch(listCatalogs("AZ"));
    dispatch(contentTypeList("AZ"))
  }, [dispatch]);
  useEffect(() => {
    if (actInfo.platformRef.id) {
      setCatalog(actInfo.platformRef.catalog);
      setPlatform(actInfo.platformRef.platform);
      setMaincontentType(actInfo.platformRef.content_type);
    }
  }, [actInfo.platformRef, actInfo]);
  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form
          onSubmit={actInfo.platformRef.id ? submitHandlerEdit : submitHandler}
        >
          {error && <Message variant="alert-danger">{error}</Message>}
          {loadingUpdate && <Loading />}
          {loading && <Loading />}
          {loadingCreate && <Loading />}
          <div className="mb-4">
            <label className="form-label">Platforms</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-control"
              onChange={(e) => setPlatform(e.target.value)}
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
          <div className="mb-4">
            <label className="form-label">Catalogs</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-control"
              onChange={(e) => setCatalog(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Catalog ...
              </option>
              {catalogs &&
                catalogs.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Type</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-control"
              onChange={(e) => setMaincontentType(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Type ...
              </option>
              {contentType &&
                contentType.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-grid">
            {actInfo.platformRef.id ? (
              <>
                <button className="btn btn-warning py-3 mb-3" type="submit">
                  Edit Platform
                </button>
                <button
                  onClick={() => {
                    setPlatform("");
                    setCatalog("");
                    setMaincontentType("");
                    actInfo.platformRef.id = null;
                    history.replace("/platform-ref");
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

export default CreatePlatformsRef;
