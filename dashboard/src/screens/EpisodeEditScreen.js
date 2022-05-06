import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditSeasonMain from "../components/Seasons/EditSeasonMain";
import EditEpisodeMain from "../components/Episodes/EditEpisodeMain";

const EpisodeEditScreen = ({ match }) => {
  const episodeId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditEpisodeMain episodeId={episodeId} />
      </main>
    </>
  );
};
export default EpisodeEditScreen;
