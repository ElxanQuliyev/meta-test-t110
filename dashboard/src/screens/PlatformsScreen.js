import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import {  useParams } from "react-router-dom";
import MainPlatforms from "../components/Platforms/MainPlatforms";

const PlatformsScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPlatforms platformId={id}/>
      </main>
    </>
  );
};

export default  PlatformsScreen;
