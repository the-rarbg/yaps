import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../../Common/Loader'
import {
  getListComment,
  movieDetailsPost,
  postComment,
} from '../../../service/service'
import moment from 'moment'
import { formatBytes } from '../../../Common/CardExpanded'
import YouTube from 'react-youtube'
import ToastMsg from '../../../Common/ToastMsg'
import Head from 'next/head'
const Details = () => {
  let trackers = [
    'udp://tracker.therarbg.com:6969/announce',
    'udp://tracker.t-rb.org:6969/announce',
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://opentracker.i2p.rocks:6969/announce',
    'udp://tracker.openbittorrent.com:6969/announce',
    'udp://open.demonii.com:1337/announce',
    'udp://exodus.desync.com:6969/announce',
    'udp://open.stealth.si:80/announce',
    'udp://tracker.torrent.eu.org:451/announce',
    'udp://tracker.moeking.me:6969/announce',
    'udp://tracker1.bt.moack.co.kr:80/announce',
    'udp://tracker.bitsearch.to:1337/announce',
    'udp://explodie.org:6969/announce',
    'udp://tracker.tiny-vps.com:6969/announce',
    'udp://tracker.theoks.net:6969/announce',
    'udp://p4p.arenabg.com:1337/announce',
    'udp://movies.zsw.ca:6969/announce',
  ]

  let temp = '&tr='
  let tracker = ''
  trackers.map(item => {
    tracker = tracker + temp + item
  })

  const router = useRouter()
  let id
  let slug
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()
  const [comment, setComment] = useState('')
  const [eid, setEid] = useState('')
  const [commentList, setCommentList] = useState([])
  const [magnateDownload, setMagnateDownload] = useState('')
  const [torrentDownload, setTorrentDownload] = useState('')
  const [highligth, setHighLight] = useState('Trackers')

  useEffect(() => {
    if (router.isReady) {
      id = router.query.id
      slug = router.query.slug
      if (!id) return null
      getDetails()
    }
  }, [router.isReady])

  const getDetails = () => {
    setLoader(true)
    movieDetailsPost(id, slug)
      .then(res => {
        setLoader(false)

        let url = `magnet:?xt=urn:btih:${res?.data?.info_hash}&dn=${res?.data?.name}${trackers}`
        let url_t = `https://m2t.mirrorbay.org/info-hash/${res?.data?.info_hash}/${res?.data?.name}/?apikey=therarbg`
        setMagnateDownload(url)
        setTorrentDownload(url_t)

        setData(res?.data)
        setEid(res?.data?.eid)
        getCommentInfo(res?.data?.eid)
      })
      .catch(err => {
        setLoader(false)
        console.log(err)
      })
  }

  const getCommentInfo = value => {
    setLoader(true)
    let token = localStorage.getItem('access_token')
    getListComment(value, token)
      .then(res => {
        console.log('response', res)
        setLoader(false)
        setCommentList(res?.data?.results)
      })
      .catch(err => {
        setLoader(false)
        console.log('error  :', err)
      })
  }
  const postCommentInfo = () => {
    setLoader(true)
    let token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
    }
    let data = {
      trb_post: eid,
      comment: comment,
    }
    postComment(data, token)
      .then(res => {
        console.log('response', res)
        getCommentInfo(eid)
      })
      .catch(err => {
        setLoader(false)
        if (err?.res?.status === 401) {
          window.location.hre = '/'
        }
        console.log('error  :', err)
      })
  }

  const opts = {
    height: '300px',
    width: '100%',
    border: '8px',
    playerVars: {
      autoplay: 0,
    },
  }
  const [disabledToast, setDisabledToast] = useState(false)
  const copyToClipBoard = async () => {
    if (disabledToast) {
      return
    }
    try {
      await navigator.clipboard.writeText(magnateDownload)
      ToastMsg('Copied!', 'success')
      setDisabledToast(true)
      setTimeout(() => {
        setDisabledToast(false)
      }, 3000)
    } catch (err) {
      console.log('pp', err)
      ToastMsg('Failed to copy!', 'error')
    }
  }
  console.log(data);

  return (
    <div>
      {loader ? <Loader /> : null}
      <Head>
        <title>{data?.name} | Yaps</title>
      </Head>
      <div className='m-auto w-full pb-5'>
        <div className='dark:bg-card flex w-full flex-col justify-start rounded-lg border-gray-200 border-opacity-30  bg-gray-600 bg-opacity-10 p-10  md:flex-row'>
          <div className='relative mx-auto w-[50%] p-2 md:w-[15%]'>
            <img
              src={
                data?.thumbnail
                  ? data?.thumbnail
                  : 'https://i.therarbg.com/np.jpg'
              }
              width={800}
              height={100}
              alt='movie'
            />
          </div>

          <div className='long-and-truncated flex h-auto w-[94%] flex-col justify-around p-2 text-[16px] text-app-dark-blue text-opacity-80 dark:text-gray-200  md:w-[50%] '>
            <h1>{data?.name}</h1>
            <div className='flex space-x-4 '>
              <a
                href={`/get-posts/category:${data?.category_str}`}
                className='my-4 cursor-pointer border-primary bg-primary/10 px-2 text-xs text-primary hover:bg-primary/30'
                style={{ border: 'none', fontWeight: '400' }}>
                {data?.category_str}
              </a>
              <span
                className='my-4 border-primary bg-primary/10 px-2 text-xs text-primary hover:bg-primary/30'
                style={{ border: 'none', fontWeight: '400' }}>
                {' '}
                &#128077; {data?.imdb_data?.rating}
              </span>
              {/* <span className='px-2 bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "none", fontWeight: "400" }}> &#x1F44D; 0</span> */}
            </div>

            <div className='bottom-[0.7rem] flex w-full justify-between text-[13px]  text-app-dark-blue dark:text-gray-200'>
              <div>
                <span>Seeders</span>
                <span>Leechers</span>
                <span>File Size</span>
                <span>Downloads</span>
                <span>Uploaded</span>
              </div>
              <div>
                <span>{data?.seeders}</span>
                <span>{data?.leechers}</span>
                <span>{formatBytes(data?.size)}</span>
                <span>{data?.downloads}</span>
                <span>{moment(data?.timestamp).format('MMMM Do YYYY')}</span>
              </div>
            </div>
          </div>

          <div className='relative h-auto w-full min-w-0 flex-1 p-2 text-right text-[16px] text-gray-200 text-opacity-80 md:mx-1 md:w-[35%]'>
            <div className='flex h-full flex-col justify-around'>
              <div className='flex flex-col items-end'>
                <button
                  className='my-3 w-full rounded border-primary bg-primary/10 bg-gradient-to-r from-green-400 via-purple-500 to-purple-600 px-[2rem] py-2 text-[15px] text-gray-100  hover:text-app-dark-blue  xl:w-[70%]'
                  onClick={() => {
                    window.open(torrentDownload, '_self')
                  }}>
                  Torrent Download
                </button>
                <button
                  className='my-3 w-full rounded border-primary bg-primary/10 bg-gradient-to-r from-[#420075] via-purple-500 to-[#FF0054] px-[2rem] py-2 text-[15px] text-gray-100  hover:text-app-dark-blue  xl:w-[70%]'
                  onClick={() => {
                    router.push(`/play/${data?.category_str.toLowerCase()}?id=${data?.imdb}&tmdb=${data?.imdb_data.tmdb_id}`)
                  }}>
                  Play Now
                </button>

                <button
                  className='my-3 w-full rounded border-primary bg-primary/10  bg-gradient-to-r  from-violet-500 via-purple-500 to-indigo-900 px-[2rem] py-2 text-[15px] text-gray-100 hover:text-app-dark-blue xl:w-[70%]'
                  onClick={() => {
                    copyToClipBoard()
                  }}>
                  &#129522; Copy To Clipboard{' '}
                </button>
                <button
                  className='w-full rounded border-primary bg-primary/10 bg-gradient-to-r  from-green-400  via-blue-500 to-blue-600 px-[2rem] py-2 text-[15px] text-gray-100 hover:text-app-dark-blue xl:w-[70%]'
                  onClick={() => {
                    window.open(magnateDownload, '_blank')
                  }}>
                  &#129522; Magnet Download{' '}
                </button>
              </div>

              <div className='bottom-2 flex justify-end align-bottom'>
                <button
                  className='mr-[0.4rem] mt-4 w-[50%] rounded border-primary bg-primary/10 px-[1.4rem] py-2 text-[13px]  text-primary hover:bg-primary/30 xl:w-[35%]'
                  style={{ border: 'none', fontWeight: '400' }}
                  onClick={() => {
                    window.location.reload()
                  }}>
                  {' '}
                  &#8634; Refresh
                </button>
                <button
                  className='ml-[0.4rem] mt-4 w-[50%] rounded border-primary bg-primary/10 px-[1.4rem] py-2 text-[13px] text-primary hover:bg-primary/30 xl:w-[35%]'
                  style={{ border: 'none', fontWeight: '400' }}>
                  !Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div
          className={`mb-6 grid gap-2 ${
            data?.imdb_data?.video_list[0]?.key
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2'
          }`}>
          <div>
            <div className='mb-4 flex space-x-4 text-[13px]  text-app-dark-blue dark:text-gray-200'>
              <span
                className={`mb-[5px] cursor-pointer  rounded px-[0.5rem]  ${
                  highligth === 'Files' ? 'bg-primary/10' : ''
                }`}
                onClick={() => setHighLight('Files')}>
                Files
              </span>
              <span
                className={`mb-[5px] cursor-pointer  rounded px-[0.5rem]  ${
                  highligth === 'Trackers' ? 'bg-primary/10' : ''
                }`}
                onClick={() => setHighLight('Trackers')}>
                Trackers
              </span>
              <span
                className={`mb-[5px] cursor-pointer  rounded px-[0.5rem]  ${
                  highligth === 'More' ? 'bg-primary/10' : ''
                }`}
                onClick={() => setHighLight('More')}>
                More Info
              </span>
            </div>
            <div
              className='dark:bg-card h-[300px] overflow-y-scroll rounded-lg border-gray-200 border-opacity-30 bg-white bg-opacity-10 p-2  text-app-dark-blue dark:text-gray-300'
              style={{ fontSize: '14px' }}>
              {trackers.map((item, index) => {
                return (
                  <p
                    className='long-and-truncated w-fit break-all p-1 font-light'
                    key={index}>
                    {item}
                  </p>
                )
              })}
            </div>
          </div>

          {data?.imdb_data?.video_list[0]?.key ? (
            <div className='text-gray-300'>
              <span className='pl-5'>Trailer</span>

              <YouTube
                videoId={data?.imdb_data?.video_list[0]?.key}
                style={{ borderRadius: '8px', marginTop: '17px' }}
                opts={opts}
              />
            </div>
          ) : null}

          <div className=' text-app-dark-blue dark:text-gray-300'>
            <span className='pl-5'>Similar Torrents</span>
            <div
              className='dark:bg-card h-[300px] w-full overflow-y-scroll rounded-lg border-gray-200 border-opacity-30  bg-white bg-opacity-10 pt-2'
              style={{ marginTop: '17px' }}>
              {data?.recomendations.length > 0 ? (
                data?.recomendations?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        let slug = item[`n`]
                          .toLowerCase()
                          .trim()
                          .replace(/[^\w\s-]/g, '')
                          .replace(/[\s_-]+/g, '-')
                          .replace(/^-+|-+$/g, '')
                        window.location.href = `/post-detail/${item?.pk}/${slug}/`
                      }}
                      className='long-and-truncated   m-3 w-fit cursor-pointer  break-all  text-app-dark-blue dark:text-gray-300'
                      style={{ fontSize: '14px' }}>
                      <p>{item[`n`]}</p>
                      <div className='item-center flex text-[12px] text-off-white'>
                        <span
                          className='my-4 mr-3 rounded border-primary bg-primary/10 px-2 py-[1.5px] text-xs text-primary hover:bg-primary/30'
                          style={{ border: 'none', fontWeight: '400' }}>
                          {item['c']}
                        </span>
                        <span className='my-4 mr-3 rounded border-primary bg-primary/10 px-2 py-[1.5px] text-xs text-primary hover:bg-primary/30'>
                          <i className='fa fa-database mx-4 text-primary'></i>{' '}
                          {'  ' + formatBytes(item[`s`])}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='nosimilar_torrent'>
                  <h1>Sorry No Similar Torrents available</h1>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='dark:bg-card relative mt-[2rem] inline-grid w-full justify-start rounded-lg border-gray-200 border-opacity-30 bg-white bg-opacity-10 p-10'>
          <div className='mb-2  w-[90%]'>
            {commentList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='dark:bg-card rounded-lg border-gray-200 border-opacity-30 bg-white bg-opacity-10 p-3'>
                  <h1>{item?.info?.user}:</h1>
                  <span>{item?.comment || 'This IS A GOOD movie'}</span>
                </div>
              )
            })}
          </div>
          <div className='mb-2 w-[90%]'>
            <input
              type='text'
              className='dark:bg-card  w-[90%] w-full rounded border-gray-200 border-opacity-30  bg-app-dark-blue bg-opacity-10 p-2 px-3 text-[12px] text-app-dark-blue placeholder:text-app-dark-blue dark:bg-white dark:text-gray-500 dark:placeholder:text-app-pure-white'
              onChange={e => setComment(e.target.value)}
              placeholder='Write your comments here'
            />
            <button
              onClick={postCommentInfo}
              className='my-4 w-[100px] rounded border-primary bg-primary/10 px-2 py-[2.5px] text-xs text-primary hover:bg-primary/30'
              style={{ border: 'solid 0.5px', fontWeight: '400' }}>
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
