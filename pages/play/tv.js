import React from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'

const Tv = () => {
    const router = useRouter()
    const { id,tmdb} = router.query;
  return (
    <>
    <Head>
        <title>Play Tv | Yaps</title>
      </Head>
      <iframe src={`https://vidsrc.me/embed/tv?${tmdb?(`tmdb=${tmdb}`):(`imdb=${id}`)}`} frameBorder="0" style={{width: '100%' ,height: '92vh'}} allowfullscreen="allowfullscreen"></iframe>
    </>
  )
}

export default Tv
