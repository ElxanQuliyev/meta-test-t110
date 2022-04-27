import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { actorCreate, updateActors } from "../../Redux/Actions/ActorActions";
import { ACTOR_CREATE_RESET, ACTOR_UPDATE_RESET } from "../../Redux/Constants/ActorConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateActors = (actInfo) => {
  const history=useHistory()

  const [name, setName] = useState("");
  const [previewImage,setPreviewImage]=useState("")
  const [mainPicture,setMainPicture]=useState("")


  const dispatch = useDispatch();
  const actorUpdate = useSelector((state) => state.actorUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = actorUpdate;
  useEffect(()=>{
    if(successUpdate){
      toast.success("Actor Updated", ToastObjects);
      dispatch({ type: ACTOR_UPDATE_RESET });
    }
  },[dispatch,successUpdate])
  const actorInfo = useSelector((state) => state.actorCreate);
  const { loading, error} = actorInfo;
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
  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(actorCreate({name,mainPicture}))
    actInfo.actor.id=null
    setName("")
    setMainPicture("")
    setPreviewImage("")
    history.replace("/actor")
  }
  const submitHandlerEdit =(e)=>{
    e.preventDefault();
    dispatch(updateActors(actInfo.actor.id,{name,mainPicture}))
    actInfo.actor.id=null
    setName("")
    setMainPicture("")
    setPreviewImage("")
    history.replace("/actor")
  }
  useEffect(()=>{
    if(actInfo.actor.id){
      setName(actInfo.actor.name)
      setPreviewImage(actInfo.actor.picture)
      setMainPicture(actInfo.actor.picture)
    }
  },[actInfo.actor,actInfo])
  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={actInfo.actor.id? submitHandlerEdit:submitHandler}>
        {error && <Message variant="alert-danger">{error}</Message>}
                  {loadingUpdate && <Loading />}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label
                      htmlFor={`product_title`}
                      className="form-label"
                    >
                      Actor title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id={`actor_title`}
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
          <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input className="form-control"
                    placeholder="image url..."
                    type="text" value={mainPicture} onChange={(e)=>setMainPicture(e.target.value)}/>
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                    {previewImage  && (
                      <img width={150} src={previewImage} alt="" />
                    )}
                  </div>
          <div className="d-grid">
            {actInfo.actor.id ? (
              <>
              <button className="btn btn-warning py-3 mb-3" type="submit">Edit Actor</button>
              <button onClick={()=>{
                setName("")
                actInfo.actor.id=null
                history.replace("/actor")

              }} className="btn btn-secondary py-3">Cancel</button>

              </>
            

            ):(
              <button type="submit" className="btn btn-primary py-3">Create Actor</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateActors;
