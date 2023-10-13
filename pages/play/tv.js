import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import useSWR from 'swr'
import { BsFillLightbulbFill } from 'react-icons/bs'
import {
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
} from 'react-icons/bi'
import { useTheme } from 'next-themes'

const servers_ = [
  {
    servername: 'Vidsrc.to',
    link: 'https://vidsrc.to/embed/tv/',
  },
  {
    servername: 'Vidsrc.me',
    link: 'https://vidsrc.me/embed/tv?',
  },
  {
    servername: 'Moviesapi.club',
    link: 'https://moviesapi.club/tv/',
  },
  {
    servername: 'Blackvid',
    link: 'https://blackvid.space/embed?tmdb=',
  },
]
const fetcher = (...args) => fetch(...args).then(res => res.json())

const Tv = () => {
  const router = useRouter()
  const { id, tmdb } = router.query
  const { theme, setTheme } = useTheme()
  const { data } = useSWR(`/api/tv/${tmdb}`, fetcher)
  const [tvDetails, setTvDetails] = useState({
    episode: 1,
    season: 1,
  })
  const [season, SetSeason] = useState([])
  const [episodes, setEpisodes] = useState({})
  const [seasonDropDown, setSeasonDropDown] = useState(false)
  const [episodeDropDown, setEpisodeDropDown] = useState(false)
  const [videoServer, setVideoServer] = useState(`vidsrc.to`)
  const [lightStatus, switchLight] = useState(false)
  const [nextBtn, showNextBtn] = useState(true)
  const [prevBtn, showPrevBtn] = useState(true)
  const [nextprevbtnclicked, setnextprevbtnclicked] = useState(false)
  useEffect(() => {
    let temp = []
    if (data)
      if (data.detail.seasons[0].name.includes('Specials'))
        for (let i = 1; i < data.detail.seasons.length; i++) {
          temp.push(i)
        }
      else
        for (let i = 1; i <= data.detail.seasons.length; i++) {
          temp.push(i)
        }
    SetSeason(temp)
    let episode = []
    let c = 1
    if (data) {
      if (data.detail.seasons[0].name.includes('Specials')) {
        for (let k = 0; k < temp.length; k++) {
          for (let i = 1; i < data.detail.seasons[c].episode_count + 1; i++)
            episode.push(i)
          episodes[c] = episode
          c++
          episode = []
        }
      } else {
        c = 0
        for (let k = 0; k < temp.length; k++) {
          for (let i = 1; i < data.detail.seasons[c].episode_count + 1; i++)
            episode.push(i)
          episodes[c + 1] = episode
          c++
          episode = []
        }
      }
    }
  }, [seasonDropDown, episodeDropDown, nextprevbtnclicked])
  useEffect(() => {
    console.log(theme)
    if (localStorage.getItem('userWatched')) {
      let data = JSON.parse(localStorage.getItem('userWatched'))
      let tvPresent = -1
      if (id || tmdb) {
        for (let i in data.tv) {
          if (id) {
            if (data.tv[i][0] === id) {
              tvPresent = i
            }
          } else {
            if (data.tv[i][0] === tmdb) {
              tvPresent = i
            }
          }
        }
      }
      if (id || tmdb)
        if (tvPresent !== -1) {
          setTvDetails({ season: data.tv[i][1], episode: data.tv[i][2] })
        } else {
          if (id || tmdb) {
            if (id) data.tv.push([id, tvDetails.season, tvDetails.episode])
            else data.tv.push([tmdb, tvDetails.season, tvDetails.episode])
            localStorage.setItem('userWatched', JSON.stringify(data))
          }
        }
    } else {
      if (id || tmdb)
        localStorage.setItem(
          'userWatched',
          JSON.stringify({
            movies: [],
            tv: [[id ? id : tmdb, tvDetails.season, tvDetails.episode]],
          })
        )
    }
  }, [id, tmdb])
  useEffect(() => {
    if (data !== undefined) {
      if (localStorage.getItem('userWatched')) {
        let dataa = JSON.parse(localStorage.getItem('userWatched'))
        let tvPresent = -1
        if (id || tmdb) {
          for (let i in dataa.tv) {
            if (id) {
              if (dataa.tv[i][0] === id) {
                tvPresent = i
              }
            } else {
              if (dataa.tv[i][0] === tmdb) {
                tvPresent = i
              }
            }
          }
        }
        if (id || tmdb)
          if (tvPresent !== -1) {
            if (id)
              dataa.tv[tvPresent] = [id, tvDetails.season, tvDetails.episode]
            else
              dataa.tv[tvPresent] = [tmdb, tvDetails.season, tvDetails.episode]
            localStorage.setItem('userWatched', JSON.stringify(dataa))
          } else {
            if (id || tmdb) {
              if (id) dataa.tv.push([id, tvDetails.season, tvDetails.episode])
              else dataa.tv.push([tmdb, tvDetails.season, tvDetails.episode])
              localStorage.setItem('userWatched', JSON.stringify(dataa))
            }
          }
      }
      if (tvDetails.season === 1 && tvDetails.episode === 1) {
        showPrevBtn(false)
      } else {
        showPrevBtn(true)
      }
      if (
        tvDetails.season === season[season.length - 1] &&
        tvDetails.episode ===
          episodes[tvDetails.season][episodes[tvDetails.season].length - 1]
      ) {
        showNextBtn(false)
      } else {
        showNextBtn(true)
      }
      let inputstrings = `${data?.detail.name}season`
      let inputStringe = `${data?.detail.name}episode`
      if (
        localStorage.getItem(inputstrings.replace(/\s+/g, '').toLowerCase())
      ) {
        localStorage.setItem(
          inputstrings.replace(/\s+/g, '').toLowerCase(),
          tvDetails.season
        )
      }
      if (
        localStorage.getItem(inputStringe.replace(/\s+/g, '').toLowerCase())
      ) {
        localStorage.setItem(
          inputStringe.replace(/\s+/g, '').toLowerCase(),
          tvDetails.episode
        )
      }
      if (videoServer.includes('vidsrc.me'))
        setVideoServer(
          `https://vidsrc.me/embed/tv?${
            tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
          }&season=${tvDetails.season}&episode=${tvDetails.episode}`
        )
      if (videoServer.includes('vidsrc.to'))
        setVideoServer(
          `https://vidsrc.to/embed/tv/${tmdb ? `${tmdb}` : `${id}`}/${
            tvDetails.season
          }/${tvDetails.episode}`
        )
      else if (videoServer.includes('moviesapi.club'))
        setVideoServer(
          `https://moviesapi.club/tv/${tmdb}-${tvDetails.season}-${tvDetails.episode}`
        )
      else if (videoServer.includes('blackvid.space'))
        setVideoServer(
          `https://blackvid.space/embed?tmdb=${tmdb}&season=${tvDetails.season}&episode=${tvDetails.episode}`
        )
    }
  }, [tvDetails])
  console.log(data?.detail?.seasons[0].poster_path)

  //adding event listener for window to catch left click to remove light setting
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
        <title>Play Tv | Yaps</title>
      </Head>
      <div
        className={`left-0  top-0 z-[997] w-full bg-black transition duration-300 ease-in-out ${
          lightStatus ? 'opacity-1 fixed h-screen ' : 'h-0 w-0 opacity-0'
        }`}></div>
      <div
        className={` flex w-full flex-col   ${
          lightStatus ? '' : 'h-full'
        } z-[999] h-full`}>
        {/*<img src={`${TMDB_IMAGE_ENDPOINT}/${images}`}/>*/}
        <div className={'h-16 w-full pb-2 text-3xl'}>
          {data?.detail.name} S{tvDetails.season} E{tvDetails.episode}
        </div>
        <iframe
          src={
            videoServer !== 'vidsrc.to'
              ? videoServer
              : `https://vidsrc.to/embed/tv/${tmdb ? tmdb : id}/${
                  tvDetails.season
                }/${tvDetails.episode}`
          }
          className={'z-50 '}
          style={{ width: '100%', height: '92vh' }}
          allowFullScreen='allowfullscreen'></iframe>
        <div
          className={
            'flex w-full flex-row items-center justify-between gap-10 bg-transparent p-4 pl-0'
          }>
          <div>
            <div
              className={'relative flex w-44 items-center justify-start gap-1'}>
              <div className={'relative'}>
                <BiSolidSkipPreviousCircle
                  size={35}
                  onClick={() => {
                    setnextprevbtnclicked(true)
                    let current_Episode = tvDetails.episode
                    let current_Season = tvDetails.season
                    if (episodes[current_Season]) {
                      if (
                        episodes[current_Season].indexOf(current_Episode) === 0
                      ) {
                        if (season.indexOf(tvDetails.season) !== 0) {
                          setTvDetails({
                            season: current_Season - 1,
                            episode:
                              episodes[current_Season - 1][
                                episodes[current_Season].length - 1
                              ],
                          })
                        }
                      } else {
                        setTvDetails(prev => {
                          return { ...prev, episode: current_Episode - 1 }
                        })
                      }
                    }
                  }}
                  className={`${
                    prevBtn ? 'block' : 'hidden'
                  } control-button transition duration-300 ease-in-out hover:scale-125`}
                />
                <div
                  className={
                    'tooltip-div absolute left-5 z-50 hidden w-10 bg-[#222222] text-center'
                  }>
                  Prev
                </div>
              </div>
              <div
                className={'relative'}
                onClick={() => {
                  let current_Episode = tvDetails.episode
                  let current_Season = tvDetails.season
                  setnextprevbtnclicked(true)
                  if (episodes[tvDetails.season]) {
                    if (
                      episodes[tvDetails.season].indexOf(current_Episode) ===
                      episodes[tvDetails.season].length - 1
                    ) {
                      if (
                        season.indexOf(tvDetails.season) !==
                        season.length - 1
                      ) {
                        setTvDetails({
                          season: current_Season + 1,
                          episode: 1,
                        })
                      }
                    } else {
                      setTvDetails(prev => {
                        return { ...prev, episode: current_Episode + 1 }
                      })
                    }
                  }
                }}>
                <BiSolidSkipNextCircle
                  size={35}
                  className={`${
                    nextBtn ? 'block' : 'hidden'
                  } control-button transition duration-300 ease-in-out hover:scale-125`}
                />
                <div
                  className={
                    'tooltip-div absolute left-5 z-50 hidden w-10 bg-[#222222] text-center'
                  }>
                  Next
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center justify-center gap-10 ${
              lightStatus ? 'text-white' : ''
            }`}>
            <div
              onClick={() => switchLight(!lightStatus)}
              className={
                'flex flex-row items-center gap-1 transition duration-300 ease-in-out hover:cursor-pointer hover:text-orange-500'
              }>
              <BsFillLightbulbFill />
              <span>Light</span>
            </div>
            <div className={'relative w-32 '}>
              <div
                className={
                  'z-50 flex cursor-pointer flex-row items-center justify-center   gap-2 rounded bg-[#151515] text-white  outline-0 dark:bg-inherit'
                }
                onClick={() => {
                  setSeasonDropDown(!seasonDropDown)
                  setEpisodeDropDown(false)
                }}>
                Season {tvDetails.season}
                <span className={'pt-1 transition duration-300 ease-in-out'}>
                  {seasonDropDown ? <AiOutlineDown /> : <AiOutlineRight />}
                </span>
              </div>
              <div
                className={` absolute  z-40  h-44 w-44  flex-col  items-center justify-center overflow-y-scroll font-normal text-white transition duration-300 ease-in-out ${
                  seasonDropDown
                    ? 'opacity-1 translate-y-0'
                    : 'translate-y-[-150%]   opacity-0'
                } `}>
                <ul className={''}>
                  {season !== [] ? (
                    season.map((season, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setTvDetails({ season: season, episode: 1 })
                            setSeasonDropDown(false)
                          }}
                          className={`dropdown-scroll relative flex  h-12 w-full items-center justify-evenly bg-app-semi-dark-blue pl-2 hover:cursor-pointer hover:bg-amber-700 ${
                            tvDetails.season === season ? 'bg-amber-700' : ''
                          }`}>
                          Season <span>{season}</span>
                        </li>
                      )
                    })
                  ) : (
                    <li>No Seasons</li>
                  )}
                </ul>
              </div>
            </div>
            <div className={'relative w-32 '}>
              <div
                className={
                  'z-50 flex flex-row items-center justify-center gap-2 rounded   bg-[#151515] text-white dark:bg-inherit'
                }
                onClick={() => {
                  setEpisodeDropDown(!episodeDropDown)
                  setSeasonDropDown(false)
                }}>
                Episode {tvDetails.episode}
                <span className={'pt-1 transition duration-300 ease-in-out'}>
                  {episodeDropDown ? <AiOutlineDown /> : <AiOutlineRight />}
                </span>
              </div>
              <div
                className={` absolute   z-40 h-44 w-44 flex-col  items-center  justify-center overflow-y-scroll bg-app-semi-dark-blue font-normal text-white transition duration-300 ease-in-out ${
                  episodeDropDown
                    ? 'opacity-1 translate-y-0'
                    : 'translate-y-[-150%]   opacity-0'
                } `}>
                <ul className={''}>
                  {episodes[tvDetails.season] ? (
                    episodes[tvDetails.season].map((episode, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setTvDetails(prev => {
                              return { ...prev, episode: episode }
                            })
                            setEpisodeDropDown(false)
                          }}
                          className={`dropdown-scroll relative  flex h-12 w-full items-center justify-evenly pl-2 hover:cursor-pointer hover:bg-amber-700 ${
                            tvDetails.episode === episode ? 'bg-amber-700' : ''
                          }`}>
                          Episode <span>{episode}</span>
                        </li>
                      )
                    })
                  ) : (
                    <li>No Episode</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className={` ${
            lightStatus ? 'hidden' : 'flex'
          } h-36 w-full  items-center justify-start`}>
          <div className={'flex h-full w-full flex-row rounded '}>
            <div
              className={`h-full w-1/3 p-2 text-center text-black dark:text-white`}>
              {`You are watching `}
              <div className={' font-bold'}>{data ? data.detail.name : ''}</div>
              <div>
                {' '}
                If current server doesn't work please try other servers beside.
              </div>
            </div>
            <div className={` h-full w-2/3`}>
              <div
                className={
                  'flex h-10 w-full flex-row flex-wrap items-center justify-start gap-7 p-5'
                }>
                {servers_.map((server, index) => {
                  return (
                    <div
                      onClick={() => {
                        if (server.servername === 'Vidsrc.me')
                          setVideoServer(
                            `${server.link}${
                              tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
                            }&season=${tvDetails.season}&episode=${
                              tvDetails.episode
                            }`
                          )
                        else if (server.servername === 'Vidsrc.to')
                          setVideoServer(
                            `${server.link}${tmdb ? `${tmdb}` : `${id}`}/${
                              tvDetails.season
                            }/${tvDetails.episode}`
                          )
                        else if (server.servername === 'Moviesapi.club')
                          setVideoServer(
                            `${server.link}${tmdb}-${tvDetails.season}-${tvDetails.episode}`
                          )
                        else
                          setVideoServer(
                            `${server.link}${tmdb}&season=${tvDetails.season}&episode=${tvDetails.episode}`
                          )
                      }}
                      className={`  ${
                        videoServer.includes(server.servername.toLowerCase())
                          ? 'bg-amber-700'
                          : ''
                      } h-8 w-max rounded p-3 text-center transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer dark:text-white `}
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
    </>
  )
}

export default Tv
