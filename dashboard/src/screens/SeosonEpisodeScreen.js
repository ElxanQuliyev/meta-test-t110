import React from 'react'
import Header from '../components/Header';
import MainSeasons from '../components/Seasons/MainSeasons';
import Sidebar from '../components/sidebar'

const SeosonEpisodeScreen = ({match}) => {
    const tvshowId = match.params.id;
  return (
    <>
        <Sidebar/>
        <main className='main-wrap'>
            <Header/>
          <MainSeasons tvshowId={tvshowId}/>
        </main>
    </>
  )
}

export default SeosonEpisodeScreen