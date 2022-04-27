import React from 'react'
import { useParams } from 'react-router-dom';
import MainCatalog from '../components/Catalogs/MainCatalog';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';

const CatalogsScreens = () => {
    const {id} = useParams();
    return (
      <>
        <Sidebar />
        <main className="main-wrap">
          <Header />
          <MainCatalog catalogId={id}/>
        </main>
      </>
    );
}

export default CatalogsScreens