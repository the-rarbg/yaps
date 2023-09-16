import React from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
const Streaming = () => {
    const router = useRouter()
    const { id } = router.query;
    


  return (
    < >
      <Head>
        <title>Streaming | Yaps</title>
      </Head>
      <iframe src={`https://vidsrc.me/embed/movie?imdb=${id}`} frameBorder="0" style={{width: '100%' ,height: '92vh'}} allowfullscreen="allowfullscreen"></iframe>
    </>
  )
}

export default Streaming
