import React, { useEffect } from "react";
import CreateActors from "./CreateActors";
import ActorsTable from "./ActorsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editActors, listActors } from "../../Redux/Actions/ActorActions";

const MainActors = (props) => {
  const dispatch = useDispatch();
  const actorId=props.actorId??null;
  const actorList = useSelector((state) => state.actorList);
  const { loading, error, actors } = actorList;
 const actorEdit = useSelector((state) => state.actorEdit);
  const {  actor } = actorEdit;
  useEffect(() => {
    if (actorId !== null) {
      dispatch(editActors(actorId));
    }
  }, [actorId, dispatch]);
  useEffect(() => {
    dispatch(listActors());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Actors</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create actor */}
            <CreateActors actor={actor}/>
            {/* Actors table */}
            <ActorsTable actors={actors}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainActors;
