import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPlatformRef, listPlatformRefs } from "../../Redux/Actions/PlatformRefActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import CreatePlatformsRef from "./CreatePlatformRefs";
import PlatformRefsTable from "./PlatformRefsTable";
const MainPlatformRefs = (props) => {
  const dispatch = useDispatch();
  const platformRefId=props.platformRefId??null;
  const platformRefList = useSelector((state) => state.platformRefList);
  const { loading, error, platformRefs } = platformRefList;
 const platformEdit = useSelector((state) => state.platformRefEdit);
  const {  platformRef } = platformEdit;
  useEffect(() => {
    if (platformRefId !== null) {
      dispatch(editPlatformRef(platformRefId));
    }
  }, [platformRefId, dispatch]);
  useEffect(() => {
    dispatch(listPlatformRefs());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Platforms</h2>
      </div>


      <div className="card shadow-sm">
        {loading && <Loading/> && error }
        {error && <Message variant="alert-danger">{error}</Message>}
        <div className="card-body">
          <div className="row">
            {/* Create Platform */}
            <CreatePlatformsRef platformRef={platformRef}/>
            {/* Platform table */}
            <PlatformRefsTable platformRefs={platformRefs}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPlatformRefs;
