import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import {  useParams } from "react-router-dom";
import MainDirectors from "../components/Directors/MainDirectors";

const DirectorsScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDirectors directorId={id}/>
      </main>
    </>
  );
};

export default  DirectorsScreen;
