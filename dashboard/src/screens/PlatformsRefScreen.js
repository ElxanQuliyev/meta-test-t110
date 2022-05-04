import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import {  useParams } from "react-router-dom";
import MainPlatformRefs from "../components/PlatformRefs/MainPlatformRefs";

const PlatformsRefScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPlatformRefs platformRefId={id}/>
      </main>
    </>
  );
};

export default  PlatformsRefScreen;
