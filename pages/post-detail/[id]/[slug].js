import { useRouter } from 'next/router';
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { Loader } from '../../../Common/Loader';
import { getListComment, movieDetailsPost, postComment } from '../../../service/service';
import moment from 'moment';
import { formatBytes } from '../../../Common/CardExpanded';
import YouTube from "react-youtube";
const Details = () => {

  let trackers = [
    "udp://tracker.therarbg.com:6969/announce",
    "udp://tracker.t-rb.org:6969/announce",
    "udp://tracker.opentrackr.org:1337/announce",
    "udp://opentracker.i2p.rocks:6969/announce",
    "udp://tracker.openbittorrent.com:6969/announce",
    "udp://open.demonii.com:1337/announce",
    "udp://exodus.desync.com:6969/announce",
    "udp://open.stealth.si:80/announce",
    "udp://tracker.torrent.eu.org:451/announce",
    "udp://tracker.moeking.me:6969/announce",
    "udp://tracker1.bt.moack.co.kr:80/announce",
    "udp://tracker.bitsearch.to:1337/announce",
    "udp://explodie.org:6969/announce",
    "udp://tracker.tiny-vps.com:6969/announce",
    "udp://tracker.theoks.net:6969/announce",
    "udp://p4p.arenabg.com:1337/announce",
    "udp://movies.zsw.ca:6969/announce",

  ]



  let temp = "&tr="
  let tracker = ""
  trackers.map((item) => {
    tracker = tracker + temp + item
  })

  const router = useRouter();
  let id;
  let slug;
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()
  const [comment, setComment] = useState("")
  const [eid, setEid] = useState("")
  const [commentList, setCommentList] = useState([])
  const [magnateDownload, setMagnateDownload] = useState("")
  const [torrentDownload, setTorrentDownload] = useState("")
  const [highligth, setHighLight] = useState("Trackers")

  useEffect(() => {
    if (router.isReady) {
      id = router.query.id;
      slug = router.query.slug;
      if (!id) return null;
      getDetails()
    }

  }, [router.isReady]);

  const getDetails = () => {
    setLoader(true)
    movieDetailsPost(id, slug).then((res) => {
      setLoader(false)

      let url = `magnet:?xt=urn:btih:${res?.data?.info_hash}&dn=${res?.data?.name}${trackers}`
      let url_t = `https://m2t.mirrorbay.org/info-hash/${res?.data?.info_hash}/${res?.data?.name}/?apikey=therarbg`
      setMagnateDownload(url)
      setTorrentDownload(url_t)



      setData(res?.data)
      setEid(res?.data?.eid)
      getCommentInfo(res?.data?.eid)

    }).catch((err) => {
      setLoader(false)
      console.log(err)
    })
  }

  const getCommentInfo = (value) => {
    setLoader(true)
    let token = localStorage.getItem("access_token")
    getListComment(value, token).then((res) => {
      console.log("response", res)
      setLoader(false)
      setCommentList(res?.data?.results)
    }).catch((err) => {
      setLoader(false)
      console.log("error  :", err)
    })
  }
  const postCommentInfo = () => {
    setLoader(true)
    let token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/login")
    }
    let data = {
      trb_post: eid,
      comment: comment
    }
    postComment(data, token).then((res) => {
      console.log("response", res)
      getCommentInfo(eid)
    }).catch((err) => {
      setLoader(false)
      if (err?.res?.status === 401) {
        window.location.hre = "/"
      }
      console.log("error  :", err)
    })
  }


  const opts = {
    height: "300px",
    width: "100%",
    border: "8px",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      {loader ? <Loader /> : null}

      <div className='w-full pb-5 m-auto'>
        <div className="w-full bg-card bg-opacity-10 rounded-lg border-gray-200 border-opacity-30 justify-start flex flex-col md:flex-row">
          <div className="w-[50%] md:w-[15%] mx-auto p-2 relative">
            <img src={data?.thumbnail ? data?.thumbnail : "https://i.therarbg.com/np.jpg"} width={800} height={100} alt='movie' />
          </div>

          <div className="w-[94%] md:w-[50%] flex flex-col justify-around text-gray-200 text-opacity-80 text-[16px] p-2 h-auto  long-and-truncated ">
            <h1 >{data?.name}</h1>
            <div className='flex space-x-4 '>
              <a  href={`/get-posts/category:${data?.category_str}`}  className='cursor-pointer px-2 bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "none", fontWeight: "400" }}>{data?.category_str}</a>
              <span className='px-2 bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "none", fontWeight: "400" }}> &#128077; {data?.imdb_data?.rating}</span>
              {/* <span className='px-2 bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "none", fontWeight: "400" }}> &#x1F44D; 0</span> */}
            </div>


            <div className='flex w-full justify-between text-gray-200 text-[13px] bottom-[0.7rem]'>
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
                <span>{moment(data?.timestamp).format("MMMM Do YYYY")}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[35%] text-gray-200 text-opacity-80 text-[16px] p-2 h-auto flex-1 min-w-0 md:mx-1 relative text-right" >
            <div className='flex flex-col justify-around h-full'>
              <div className='flex flex-col items-end'>
                <button className='w-full xl:w-[70%] px-[2rem] py-2 bg-primary/10 text-gray-100 border-primary my-4 text-[15px] rounded bg-gradient-to-r from-green-400 via-purple-500  to-purple-600  hover:text-primary' onClick={() => {
                  window.open(torrentDownload, '_self')
                }} >Torrent Download</button>
                  <button className='w-full xl:w-[70%] px-[2rem] py-2 bg-primary/10 text-gray-100 border-primary my-4 text-[15px] rounded bg-gradient-to-r from-green-400 via-purple-500  to-purple-600  hover:text-primary' onClick={() => {
                  router.push(`/streaming?id=${data?.imdb}`)
                }} >Play Now</button>
                <button className='w-full xl:w-[70%] px-[2rem] py-2 bg-primary/10  border-primary  text-[15px] text-gray-100 rounded bg-gradient-to-r from-green-400 via-blue-500 to-blue-600 hover:text-primary' onClick={() => {
                window.open(magnateDownload,"_self");
                
                }}  >&#129522; Magnet Download</button>
              </div>
              <div className='align-bottom flex bottom-2 justify-end'>
                <button className='px-[1.4rem] w-[50%] xl:w-[35%] py-2 bg-primary/10 text-primary rounded border-primary mr-[0.4rem]  text-[13px] hover:bg-primary/30 mt-4' style={{ border: "none", fontWeight: "400" }} onClick={() => {
                  window.location.reload()
                }} > &#8634; Refresh</button>
                <button className='px-[1.4rem] w-[50%] xl:w-[35%] py-2 bg-primary/10 text-primary rounded border-primary ml-[0.4rem] text-[13px] hover:bg-primary/30 mt-4' style={{ border: "none", fontWeight: "400" }} > !&#x20DD; Report</button>

              </div>
            </div>
          </div>
        </div>
        <br />
        <div className={`grid gap-2 mb-6 ${data?.imdb_data?.video_list[0]?.key ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          <div>
            <div className='flex space-x-4 text-gray-500 text-[13px] mb-4'>
              <span className={`cursor-pointer mb-[5px]  px-[0.5rem] rounded  ${highligth === "Files" ? "bg-primary/10" : ""}`} onClick={() => setHighLight("Files")} >Files</span>
              <span className={`cursor-pointer mb-[5px]  px-[0.5rem] rounded  ${highligth === "Trackers" ? "bg-primary/10" : ""}`} onClick={() => setHighLight("Trackers")} >Trackers</span>
              <span className={`cursor-pointer mb-[5px]  px-[0.5rem] rounded  ${highligth === "More" ? "bg-primary/10" : ""}`} onClick={() => setHighLight("More")} >More Info</span>
            </div>
            <div className='p-2 text-gray-300 overflow-y-scroll bg-card bg-opacity-10 h-[300px] rounded-lg border-gray-200 border-opacity-30' style={{ fontSize: "14px" }}>
              {
                trackers.map((item, index) => {
                  return (
                    <p className='p-1 long-and-truncated font-light w-fit break-all' key={index}>
                      {item}
                    </p>
                  )
                })
              }
            </div>
          </div>



          {data?.imdb_data?.video_list[0]?.key ? <div className='text-gray-300'>
            <span className='pl-5'>Trailer</span>

            <YouTube videoId={data?.imdb_data?.video_list[0]?.key} style={{ borderRadius: "8px", marginTop: '17px' }}
              opts={opts} />
          </div>
            : null}

          <div className='text-gray-300'>
            <span className='pl-5'>Similar Torrents</span>
            <div className='bg-card pt-2 w-full bg-opacity-10 overflow-y-scroll rounded-lg  h-[300px] border-gray-200 border-opacity-30' style={{ marginTop: '17px' }}>
              {data?.recomendations.length > 0 ?
                data?.recomendations?.map((item, index) => {
                  return (
                    <div key={index} onClick={() => {
                      let slug = item[`n`].toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                      window.location.href = `/post-detail/${item?.pk}/${slug}/`;
                    }} className='cursor-pointer   text-gray-300 m-3 long-and-truncated  w-fit break-all' style={{ fontSize: "14px" }}>

                      <p >
                        {item[`n`]}
                      </p>
                      <div className='text-off-white flex item-center text-[12px]'>
                        <span className='px-2 bg-primary/10 text-primary mr-3 py-[1.5px] rounded border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "none", fontWeight: "400" }}>{item['c']}</span>
                        <span className='px-2 bg-primary/10 text-primary mr-3 py-[1.5px] rounded border-primary my-4 text-xs hover:bg-primary/30'>
                          <i className="fa fa-database text-primary mx-4"></i>  {"  " + formatBytes(item[`s`])}
                        </span>
                      </div>

                    </div>

                  )
                })
                :
                <div className='nosimilar_torrent'>
                  <h1>Sorry No Similar Torrents available</h1>
                </div>}


            </div>

          </div>

        </div>

        <div className="w-full mt-[2rem] p-10 bg-card bg-opacity-10 rounded-lg border-gray-200 border-opacity-30 justify-start inline-grid relative">
          <div className='mb-2  w-[90%]'>
            {
              commentList?.map((item, index) => {
                return (
                  <div key={index} className='p-3 bg-card bg-opacity-10 rounded-lg border-gray-200 border-opacity-30'>
                    <h1>{item?.info?.user}:</h1><span>
                      {item?.comment || "This IS A GOOD movie"}
                    </span>
                  </div>
                )
              })
            }
          </div>
          <div className='mb-2 w-[90%]'>
            <input type="text" className='w-full  border-gray-200 w-[90%] rounded border-opacity-30 text-[12px] bg-card bg-opacity-10 p-2 px-3 text-gray-500' onChange={(e) => setComment(e.target.value)} placeholder="Write your comments here" />
            <button onClick={postCommentInfo} className='px-2 py-[2.5px] rounded w-[100px] bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{ border: "solid 0.5px", fontWeight: "400" }} >POST</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Details