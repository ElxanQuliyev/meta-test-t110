import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchContent from "../components/filter/SearchContent";
import ProfilePage from "../components/profil/ProfilePage";
import SignIn from "../components/registiration/SignIn";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import Register from '../components/registiration/Register'
const MyRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/:category/:id" element={<Detail/>}/>
        <Route path="/:category" element={<Catalog/>}/>
        <Route path="/RegisterPage" element={<RegisterPage/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/SearchContent' element={<SearchContent/>}/>
        <Route path='/ProfilePage' element={<ProfilePage/>}/>
      </Routes>
   
  );
};

export default MyRoutes;
