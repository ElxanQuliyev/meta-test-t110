import React, { useEffect, useState } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/Categories/MainCategories";
import { useHistory, useParams, withRouter } from "react-router-dom";

const CategoriesScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCategories categoryId={id}/>
      </main>
    </>
  );
};

export default  CategoriesScreen;
