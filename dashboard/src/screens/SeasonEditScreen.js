import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditSeasonMain from "../components/Seasons/EditSeasonMain";

const SeasonEditScreen = ({ match }) => {
  const tvshowId = match.params.tvshowId;
  const seasonId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditSeasonMain seasonId={seasonId} tvshowId={tvshowId} />
      </main>
    </>
  );
};
export default SeasonEditScreen;
