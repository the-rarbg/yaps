import React from 'react'
import { useRouter } from 'next/router';
const Streaming = () => {
    const router = useRouter()
    const { id } = router.query;
  return (
    < >
      <iframe src={`https://vidsrc.me/embed/movie?imdb=${id}`} frameborder="0" style={{width: '100%' ,height: '92vh'}} allowfullscreen="allowfullscreen"></iframe>
    </>
  )
}

export default Streaming
