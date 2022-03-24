import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddProductMain from "./../components/movies/AddMovieMain";

const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
