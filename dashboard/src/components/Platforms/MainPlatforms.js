import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPlatform, listPlatforms } from "../../Redux/Actions/PlatformActions";
import CreatePlatoforms from "./CreatePlatforms";
import PlatformsTable from "./PlatformsTable";

const MainPlatforms = (props) => {
  const dispatch = useDispatch();
  const platformId=props.platformId??null;
  const platformList = useSelector((state) => state.platformList);
  const {  platforms } = platformList;
 const platformEdit = useSelector((state) => state.platformEdit);
  const {  platform } = platformEdit;
  useEffect(() => {
    if (platformId !== null) {
      dispatch(editPlatform(platformId));
    }
  }, [platformId, dispatch]);
  useEffect(() => {
    dispatch(listPlatforms());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Platforms</h2>
      </div>


      <div className="card shadow-sm">
        {/* {loading && <Loading/> && error }
        {error && <Message variant="alert-danger">{error}</Message>} */}
        <div className="card-body">
          <div className="row">
            {/* Create Platform */}
            <CreatePlatoforms platform={platform}/>
            {/* Platform table */}
            <PlatformsTable platforms={platforms}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPlatforms;
