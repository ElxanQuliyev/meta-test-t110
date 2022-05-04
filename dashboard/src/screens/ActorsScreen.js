import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import {  useParams } from "react-router-dom";
import MainActors from "../components/Actors/MainActors";

const ActorsScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainActors actorId={id}/>
      </main>
    </>
  );
};

export default  ActorsScreen;
