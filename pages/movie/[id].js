import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import FilmCasts from '../../components/FilmCasts'
import FilmGenres from '../../components/FilmGenres'
import FilmHeading from '../../components/FilmHeading'
import FilmImage from '../../components/FilmImage'
import FilmInfo from '../../components/FilmInfo'
import FilmRating from '../../components/FilmRating'
import FilmResources from '../../components/FilmResources'
import FilmSynopsis from '../../components/FilmSynopsis'
import Loading from '../../components/Loading'
import SearchBar from '../../components/SearchBar'
import { fetcher, pathToSearchMovie } from '../../utils'
import YouTube from "react-youtube";

import TorrentList from '../../Common/TorrentList'

export default function Movie() {
  const router = useRouter()
  const { id } = router?.query
  const { data: movie, error: movieError } = useSWR(`/api/movie/${id}`, fetcher)
  const[isTorrent,setisTorrent]=useState(false)
const handleClose =()=>{
  setisTorrent(true)
}
  if (typeof (window) !== undefined) {
    console?.log("movie", movie)
  }
  if (movieError) return <div>{movieError}</div>
  if (!movie) return <div>{movieError}</div>

  const opts = {
    height: "500px",
    width: "100%",
    border: "8px",
    playerVars: {
      autoplay: 0,
    },
  };


  return (
    <>
    
      <Head>
        <title>{movie?.detail?.title} | </title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
     
      {movie ? (
        <div>
          {isTorrent?<TorrentList setisTorrent={setisTorrent} runtime={movie?.imdb?.imdb?.runtime} torrent_list={movie?.imdb?.trb_posts}/>:null}
          <section className='flex flex-col sm:mx-8 md:mx-0 md:flex-row md:items-start lg:justify-center'>
            <FilmImage
              src={movie?.detail?.poster_path}
              title={movie?.detail?.title}
            />
            <section className=''>
              <FilmHeading
                tagline={movie?.detail?.tagline}
                title={movie?.detail?.title}
              />
              <FilmRating number={renderRating(movie?.detail?.vote_average)} />
              <FilmInfo
                media_type='movie'
                language={renderLanguage(movie?.detail?.spoken_languages || [])}
                length={renderLength(movie?.detail?.runtime)}
                status={renderStatus(movie?.detailstatus)}
                year={renderYear(movie?.detail?.release_date)}
              />
              <FilmGenres genres={movie?.detail?.genres || []} />
              <FilmSynopsis synopsis={movie?.detail?.overview} />

              <FilmResources
                website={movie?.detail?.homepage}
                imdb={movie?.detail?.imdb_id}
                handleClose={handleClose}
              />
            </section>

          </section>
          {movie?.imdb?.imdb?.video_list[0]?.key ? <div className='text-gray-300'>
           
            <YouTube videoId={movie?.imdb?.imdb?.video_list[0]?.key} style={{ borderRadius: "1px" }}
              opts={opts} />
          </div>
            : null}
          <br />
       {movie?.credits?.cast?   <FilmCasts casts={movie?.credits?.cast} />:null}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export function renderRating(rating) {
  if (rating !== undefined) {
    return (rating / 2)?.toFixed(1)
  } else {
    return 0
  }
}

function renderLength(runtime) {
  if (runtime !== 0 && runtime !== undefined) {
    return runtime + ' min?.'
  } else {
    return 'N/A'
  }
}

export function renderLanguage(languages) {
  if (languages?.length !== 0) {
    return languages[0]?.name
  } else {
    return 'N/A'
  }
}

function renderYear(year) {
  if (!year) {
    return 'N/A'
  } else {
    return year?.substring(0, 4)
  }
}

export function renderStatus(status) {
  if (!status) {
    return 'N/A'
  } else {
    return status
  }
}
