import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddEpisodeMain from "../components/Episodes/AddEpisodeMain";

const AddEpisodeScreen = ({match}) => {
  const seasonId = match.params.id;
  console.log()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddEpisodeMain seasonId={seasonId}/>
      </main>
    </>
  );
};

export default AddEpisodeScreen;
