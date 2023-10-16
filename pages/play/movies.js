import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import { BsFillLightbulbFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

const servers_ = [
  {
    servername: 'Vidsrc.to',
    link: 'https://vidsrc.to/embed/movie/',
  },
  {
    servername: 'Vidsrc.me',
    link: 'https://vidsrc.me/embed/movie?',
  },
  {
    servername: 'Moviesapi.club',
    link: 'https://moviesapi.club/movie/',
  },
  {
    servername: 'Blackvid',
    link: 'https://blackvid.space/embed?tmdb=',
  },
]
const fetcher = (...args) => fetch(...args).then(res => res.json())

const Movies = () => {
  const router = useRouter()
  const { id, tmdb } = router.query
  const me = tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
  const { theme } = useTheme()
  const to = tmdb ? `${tmdb}` : `${id}`
  const [lightStatus, switchLight] = useState(false)
  const [videoServer, setVideoServer] = useState('vidsrc.to')
  const { data } = useSWR(`/api/movie/${id}`, fetcher)
  useEffect(() => {
    if (localStorage.getItem('userWatched')) {
      let data = JSON.parse(localStorage.getItem('userWatched'))
      let moviePresent = false
      for (let i in data.movies) {
        if (id)
          if (data.movies[i] === id) {
            moviePresent = true
          } else {
            if (data.movies === tmdb) {
              moviePresent = true
            }
          }
      }
      if (id || tmdb) {
        if (!moviePresent) {
          if (id) data.movies.push(id)
          else data.movies.push(tmdb)
          localStorage.setItem('userWatched', JSON.stringify(data))
        }
      }
    } else {
      if (id || tmdb)
        localStorage.setItem(
          'userWatched',
          JSON.stringify({
            movies: [id ? id : tmdb],
            tv: [],
          })
        )
    }
  }, [id, tmdb])
  useEffect(() => {
    document.addEventListener('mousedown', event => {
      if (
        event.target !== 'iframe' &&
        event.target.tagName.toLowerCase() !== 'span'
      ) {
        switchLight(false)
      }
    })
  }, [])
  return (
    <>
      <Head>
        <title>Play Movies | Yaps</title>
      </Head>
      <div
        className={` left-0 top-0 z-[997] bg-black  transition duration-300 ease-in-out ${
          lightStatus
            ? 'opacity-0.5 fixed h-screen w-full '
            : 'h-0 w-0 opacity-0'
        }`}></div>
      <div className={'text-4xl'}>{data ? data.imdb.imdb.name : ''}</div>
      <div className={`w-full  ${lightStatus ? '' : 'h-full'} z-[999] `}>
        <div className={` flex  h-full w-full  flex-col`}>
          <iframe
            src={
              videoServer !== 'vidsrc.to' ? videoServer : servers_[0].link + to
            }
            className={`z-[998] ${
              lightStatus
                ? 'absolute left-0 h-[80vh] w-full lg:left-[20%] lg:w-2/3 '
                : 'h-[95vh] w-full'
            }`}
            allowFullScreen='allowfullscreen'></iframe>
          <div
            className={`${
              lightStatus
                ? 'absolute w-1/2 text-white dark:text-black '
                : 'w-full '
            } top-[100%] z-[999] flex flex-row items-center justify-start gap-10 bg-transparent  p-4 pl-0 lg:top-[90%] `}>
            <div
              onClick={() => switchLight(!lightStatus)}
              className={
                'flex flex-row items-center gap-1 transition duration-300 ease-in-out hover:cursor-pointer hover:text-orange-500'
              }>
              <BsFillLightbulbFill />
              <span>Light</span>
            </div>
          </div>
          <div
            className={`${
              lightStatus ? 'hidden' : 'flex'
            }  flex h-36 w-full  items-center justify-start`}>
            <div className={'flex h-full w-full flex-row rounded '}>
              <div
                className={`${
                  theme === 'dark' ? 'bg-app-dark-blue' : ''
                } flex h-full  w-1/3 flex-col items-center justify-center p-2 text-center`}>
                {`You are watching `}
                <div className={' font-bold'}>
                  {data ? data.imdb.imdb.name : ''}
                </div>
                <div>
                  {' '}
                  If current server doesn't work please try other servers
                  beside.
                </div>
              </div>
              <div
                className={`${
                  theme === 'dark' ? 'bg-app-dark-blue' : ''
                } h-full  w-2/3 text-black`}>
                <div
                  className={
                    'flex h-10 w-full flex-row flex-wrap items-center justify-start gap-7 p-5'
                  }>
                  {servers_.map((server, index) => {
                    return (
                      <div
                        onClick={() => {
                          if (server.servername === 'Vidsrc.me')
                            setVideoServer(server.link + me)
                          else if (server.servername === 'Vidsrc.to')
                            setVideoServer(server.link + to)
                          else
                            setVideoServer(
                              server.link + data?.imdb.imdb.tmdb_id
                            )
                        }}
                        className={` ${
                          videoServer.includes(server.servername.toLowerCase())
                            ? ' bg-app-greyish-blue text-white '
                            : ''
                        } h-12 w-max rounded p-4 pt-3 text-center transition  duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:bg-app-greyish-blue hover:text-white dark:text-white`}
                        key={index}>
                        {server.servername}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Movies
