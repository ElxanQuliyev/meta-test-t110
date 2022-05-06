import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddSeasonMain from "../components/Seasons/AddSeasonMain";

const AddSeasonScreen = ({match}) => {
  const tvshowId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddSeasonMain tvshowId={tvshowId}/>
      </main>
    </>
  );
};

export default AddSeasonScreen;
