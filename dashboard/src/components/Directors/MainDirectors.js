import React, { useEffect } from "react";
import CreateDirectors from "./CreateDirectors";
import DirectorsTable from "./DirectorsTable";
import { useDispatch, useSelector } from "react-redux";
import { editDirectors, listDirectors } from "../../Redux/Actions/DirectorActions";

const MainDirectors = (props) => {
  const dispatch = useDispatch();
  const directorId=props.directorId??null;
  const directorList = useSelector((state) => state.directorList);
  const { loading, error, directors } = directorList;
 const directorEdit = useSelector((state) => state.directorEdit);
  const {  director } = directorEdit;
  useEffect(() => {
    if (directorId !== null) {
      dispatch(editDirectors(directorId));
    }
  }, [directorId, dispatch]);
  useEffect(() => {
    dispatch(listDirectors());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Directors</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create Director */}
            <CreateDirectors director={director}/>
            {/* Director table */}
            <DirectorsTable directors={directors}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDirectors;
