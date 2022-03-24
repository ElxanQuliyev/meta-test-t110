import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/movies/MainMovies";

const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
