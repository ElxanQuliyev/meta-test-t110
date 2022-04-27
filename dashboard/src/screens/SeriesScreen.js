import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainSeries from "../components/series/MainSeries";

const SeriesScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainSeries />
      </main>
    </>
  );
};

export default SeriesScreen;
