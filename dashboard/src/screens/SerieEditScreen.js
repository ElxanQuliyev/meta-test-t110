import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditSerieMain from "./../components/series/EditSerieMain";

const SerieEditScreen = ({ match }) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditSerieMain serieId={productId} />
      </main>
    </>
  );
};
export default SerieEditScreen;
