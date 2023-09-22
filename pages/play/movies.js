import React from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'

const Movies = () => {
    const router = useRouter()
    const { id,tmdb} = router.query;
  
  return (
    <>
     <Head>
        <title>Play Movies | Yaps</title>
      </Head>
      <iframe src={`https://vidsrc.me/embed/movie?${tmdb?`tmdb=${tmdb}`:`imdb=${id}`}`} frameBorder="0" style={{width: '100%' ,height: '92vh'}} allowfullscreen="allowfullscreen"></iframe>
      
    </>
  )
}

export default Movies
