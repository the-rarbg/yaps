import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
const Streaming = () => {
  const router = useRouter()
  const { id } = router.query
    useEffect(() => {
        localStorage
    }, );
  return (
    <>
      <Head>
        <title>Streaming | Yaps</title>
      </Head>
        <div className={"testing"}>

        </div>
      <iframe
        src={`https://vidsrc.to/embed/movie/${id}`}
        style={{ width: '100%', height: '92vh' }}
        allowFullScreen='allowfullscreen'></iframe>
    </>
  )
}

export default Streaming
