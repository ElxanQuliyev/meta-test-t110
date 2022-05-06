
import React from 'react'
import MainEpisodes from '../components/Episodes/MainEpisodes';
import Header from '../components/Header';
import Sidebar from '../components/sidebar'

const EpisodeListScreen = ({match}) => {
    const seasonId = match.params.id;
  return (
    <>
        <Sidebar/>
        <main className='main-wrap'>
            <Header/>
          <MainEpisodes seasonId={seasonId}/>
        </main>
    </>
  )
}

export default EpisodeListScreen