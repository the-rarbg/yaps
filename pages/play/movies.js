import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import useSWR from 'swr'
import { BsFillLightbulbFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

const servers_ = [
  {
    servername: 'Multiembed.mov',
    link: 'https://multiembed.mov/?video_id',
  },
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
  {
    servername: 'Gomo.to',
    link: 'https://gomo.to/movie/',
  },
]
const fetcher = (...args) => fetch(...args).then(res => res.json())

const Movies = () => {
  const router = useRouter()
  const { id, tmdb } = router.query
  const me = tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
  const { theme } = useTheme()
  const [subtitles, loadSubtitles] = useState()
  const defaultServer = 'Superembed.stream'
  const to = tmdb ? `${tmdb}` : `${id}`

  const superembed = tmdb ? `=${tmdb}&tmdb=1` : `=${id}`
  const superembed = tmdb ? `=${tmdb}&tmdb=1` : `=${id}`

  const [lightStatus, switchLight] = useState(false)
  const [videoServer, setVideoServer] = useState(defaultServer)
  const [subtitleDropDownVisible, setSubtitleDropDownStatus] = useState(false)
  const { data } = useSWR(`/api/movie/${id}`, fetcher)
  const [current_Subtitle, setCurrentSubtitle] = useState('')

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
  useEffect(() => {
    if (id || tmdb)
      fetch(`/api/movie/subtitle/${id ? id : tmdb}`)
        .then(res => res.json())
        .then(data => {
          loadSubtitles(data)
        })
  }, [id, tmdb])

  useEffect(() => {
    if (id || tmdb || current_Subtitle) {
      console.log(`/api/movie/download_subtitle/${parseInt(current_Subtitle)}`)
      fetch(`/api/movie/download_subtitle/${parseInt(current_Subtitle)}`)
        .then(res => res.json())
        .then(data => {
          setVideoServer(
            servers_[1].link + to + `?sub.file=${data.results.link}`
          )
        })
    }
  }, [current_Subtitle])

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
              videoServer !== defaultServer
                ? videoServer
                : servers_[0].link + superembed
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
            {videoServer.toLowerCase().includes('vidsrc.to') ? (
              <div className={'relative w-32'}>
                <div
                  onClick={() => {
                    setSubtitleDropDownStatus(!subtitleDropDownVisible)
                  }}
                  className={
                    'z-50 flex cursor-pointer flex-row items-center justify-center   gap-2 rounded bg-[#151515] text-white  outline-0 dark:bg-inherit'
                  }>
                  Select Subtitles
                  <span className={'pt-1 transition duration-300 ease-in-out'}>
                    {subtitleDropDownVisible ? (
                      <AiOutlineDown />
                    ) : (
                      <AiOutlineRight />
                    )}
                  </span>
                </div>
                <div
                  className={`${
                    subtitleDropDownVisible
                      ? 'opacity-1 translate-y-0'
                      : 'translate-y-[-150%]   opacity-0'
                  }  absolute  z-40  h-44 w-max flex-col  items-center justify-center overflow-y-scroll font-normal text-white transition duration-300 ease-in-out`}>
                  <ul className={''}>
                    {subtitles && subtitles.results ? (
                      subtitles.results.map((subtitle, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCurrentSubtitle(
                              subtitle.attributes.files[0].file_id
                            )
                          }}
                          className={`dropdown-scroll relative flex  h-12 w-full items-center justify-evenly bg-app-semi-dark-blue pl-2 hover:cursor-pointer hover:bg-amber-700 `}>
                          <span>{subtitle.attributes.release}</span>
                        </li>
                      ))
                    ) : (
                      <li>No Subtitles</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              ''
            )}
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
                          else if (server.servername === 'Superembed.stream')
                            setVideoServer(server.link + superembed)
                          else if (server.servername === 'Gomo.to') {
                            let splitString = data.imdb.imdb.name.split(' ')
                            let joinedString = splitString.join('-')
                            setVideoServer(server.link + joinedString)
                          } else
                            setVideoServer(
                              server.link + data?.imdb.imdb.tmdb_id
                            )
                        }}
                        className={` ${
                          videoServer
                            .toLowerCase()
                            .includes(server.servername.toLowerCase())
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
