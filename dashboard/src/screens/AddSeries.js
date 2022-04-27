import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddSerieMain from "./../components/series/AddSerieMain";

const AddSeries = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddSerieMain />
      </main>
    </>
  );
};

export default AddSeries;
