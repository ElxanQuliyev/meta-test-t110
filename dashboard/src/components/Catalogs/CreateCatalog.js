import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { catalogCreate, updateCatalog } from "../../Redux/Actions/CatalogActions";
import { listLanguage } from "../../Redux/Actions/LanguageActions";
import { CATALOG_CREATE_RESET, CATALOG_UPDATE_RESET } from "../../Redux/Constants/CatalogConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCatalog = (catInfo) => {
  const history=useHistory()
  const defaultVal= [{
    lang_code: "",
    name: "",
  },
  {
    lang_code: "",
    name: "",
  },
  {
    lang_code: "",
    name: "",
  },
  {
    lang_code: "",
    name: "",
  },
]
  const [catalogLanguage, setcatalogLanguage] = useState(defaultVal);

  const dispatch = useDispatch();
  const languageInfo = useSelector((state) => state.languageList);
  const { languages } = languageInfo ?? [];
  const catalogUpdate = useSelector((state) => state.catalogUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = catalogUpdate;
  useEffect(() => {
    dispatch(listLanguage());
  }, [dispatch]);
  useEffect(()=>{
    if(successUpdate){
      dispatch({ type: CATALOG_UPDATE_RESET });
      toast.success("catalog Updated", ToastObjects);
    }
  },[dispatch,successUpdate])
useEffect(()=>{
  if(catInfo.catalog.language){
    setcatalogLanguage(catInfo.catalog.language)
  }
},[catInfo.catalog.language,catInfo])
  const catalogInfo = useSelector((state) => state.catalogCreate);
  const { loading, error,success} = catalogInfo;
  const handleChangeLanguage = (e, i, l) => {
    const { name, value } = e.target;
    const newState = [...catalogLanguage];
    newState[i] = {
      ...newState[i],
      lang_code: l,
      [name]: value,
    };
    setcatalogLanguage(newState);
  };


  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(catalogCreate(catalogLanguage))
  }
  const submitHandlerEdit =(e)=>{
    e.preventDefault(); 
    dispatch(updateCatalog(catInfo.catalog.id,catalogLanguage))
    setcatalogLanguage(defaultVal)
    history.replace("/catalog")
    catalogInfo.catalog=null;
  }
  console.log(catInfo.catalog.id)
  useEffect(()=>{
    if(success){
      dispatch({ type: CATALOG_CREATE_RESET });
      toast.success("catalog created", ToastObjects);
    }
  },[dispatch,success])
  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={catInfo.catalog.id? submitHandlerEdit:submitHandler}>
        {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  {loadingUpdate && <Loading />}

          <Tabs>
            {languages &&
              languages.map((l, index) => (
                <Tab eventKey={l.name} title={l.name} key={`movie-tab-${l.id}`}>
                  <div className="mb-4">
                    <label
                      htmlFor={`product_title-${l.id}`}
                      className="form-label"
                    >
                      catalog title {l.name}
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id={`product_title-${l.id}`}
                      name="name"
                      required
                      value={catalogLanguage[index].name}
                      onChange={(e) => handleChangeLanguage(e, index, l.name)}
                    />
                  </div>
                </Tab>
              ))}
          </Tabs>
          <div className="d-grid">
            {catInfo.catalog.language? (
              <>
              <button className="btn btn-warning py-3 mb-3" type="submit">Edit Catalog</button>
              <button onClick={()=>{
                catInfo.catalog.language=null;
                setcatalogLanguage([...defaultVal])
                history.replace("/catalog")

              }} className="btn btn-secondary py-3">Cancel</button>

              </>
            

            ):(
              <button type="submit" className="btn btn-primary py-3">Create Catalog</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCatalog;
