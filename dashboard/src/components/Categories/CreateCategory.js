import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryCreate, updateCategory } from "../../Redux/Actions/CategoryActions";
import { listLanguage } from "../../Redux/Actions/LanguageActions";
import { CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = (catInfo) => {
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
  const [categoryLanguage, setcategoryLanguage] = useState(defaultVal);

  const dispatch = useDispatch();
  const languageInfo = useSelector((state) => state.languageList);
  const { languages } = languageInfo ?? [];
  const categoryUpdate = useSelector((state) => state.categoryUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;
  useEffect(() => {
    dispatch(listLanguage());
  }, [dispatch]);
  useEffect(()=>{
    if(successUpdate){
      dispatch({ type: CATEGORY_UPDATE_RESET });
      toast.success("Category Updated", ToastObjects);
    }
  },[dispatch,successUpdate])
useEffect(()=>{
  if(catInfo.category.language){
    setcategoryLanguage(catInfo.category.language)
  }
},[catInfo.category.language,catInfo])
  const categoryInfo = useSelector((state) => state.categoryCreate);
  const { loading, error} = categoryInfo;
  const handleChangeLanguage = (e, i, l) => {
    const { name, value } = e.target;
    const newState = [...categoryLanguage];
    newState[i] = {
      ...newState[i],
      lang_code: l,
      [name]: value,
    };
    setcategoryLanguage(newState);
  };


  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(categoryCreate(categoryLanguage))
  }
  const submitHandlerEdit =(e)=>{
    e.preventDefault();
    dispatch(updateCategory(catInfo.category.id,categoryLanguage))
    setcategoryLanguage(defaultVal)
    history.replace("/category")
    categoryInfo.category=null;
  }
  console.log(catInfo.category.id)

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={catInfo.category.id? submitHandlerEdit:submitHandler}>
        {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
          <Tabs>
            {languages &&
              languages.map((l, index) => (
                <Tab eventKey={l.name} title={l.name} key={`movie-tab-${l.id}`}>
                  <div className="mb-4">
                    <label
                      htmlFor={`product_title-${l.id}`}
                      className="form-label"
                    >
                      Category title {l.name}
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id={`product_title-${l.id}`}
                      name="name"
                      required
                      value={categoryLanguage[index].name}
                      onChange={(e) => handleChangeLanguage(e, index, l.name)}
                    />
                  </div>
                </Tab>
              ))}
          </Tabs>
          <div className="d-grid">
            {catInfo.category.language? (
              <>
              <button className="btn btn-warning py-3 mb-3" type="submit">Edit category</button>
              <button onClick={()=>{
                catInfo.category.language=null;
                setcategoryLanguage([...defaultVal])
                history.replace("/category")

              }} className="btn btn-secondary py-3">Cancel</button>

              </>
            

            ):(
              <button type="submit" className="btn btn-primary py-3">Create category</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
