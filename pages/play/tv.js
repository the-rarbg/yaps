import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import Head from 'next/head'
import {AiOutlineDown, AiOutlineRight} from "react-icons/ai";
import useSWR from "swr";
import {BsFillLightbulbFill} from "react-icons/bs";
import {BiSolidSkipNextCircle, BiSolidSkipPreviousCircle} from "react-icons/bi";
import {useTheme} from "next-themes";

const servers_ = [{
    servername: "Vidsrc.to", link: "https://vidsrc.to/embed/tv/"
}, {
    servername: "Vidsrc.me", link: "https://vidsrc.me/embed/tv?",
}, {
    servername: "Moviesapi.club", link: "https://moviesapi.club/tv/"
}, {
    servername: "Blackvid", link: "https://blackvid.space/embed?tmdb="
}]
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Tv = () => {
    const router = useRouter()
    const {id, tmdb} = router.query;
    const {theme, setTheme} = useTheme();
    const {data} = useSWR(`/api/tv/${tmdb}`, fetcher)
    const [tvDetails, setTvDetails] = useState({
        episode: 1, season: 1
    })
    const [season, SetSeason] = useState([]);
    const [episodes, setEpisodes] = useState({})
    const [seasonDropDown, setSeasonDropDown] = useState(false)
    const [episodeDropDown, setEpisodeDropDown] = useState(false)
    const [videoServer, setVideoServer] = useState(`vidsrc.to`)
    const [lightStatus, switchLight] = useState(false)
    const [nextBtn, showNextBtn] = useState(true);
    const [prevBtn, showPrevBtn] = useState(true);
    const [nextprevbtnclicked, setnextprevbtnclicked] = useState(false)
    useEffect(() => {
        let temp = []
        if (data)
            if (data.detail.seasons[0].name.includes("Specials"))
                for (let i = 1; i < data.detail.seasons.length; i++) {
                    temp.push(i);
                }
            else
                for (let i = 1; i <= data.detail.seasons.length; i++) {
                    temp.push(i);
                }
        SetSeason(temp)
        let episode = [];
        let c = 1;
        if (data) {
            if (data.detail.seasons[0].name.includes("Specials")) {
                for (let k = 0; k < temp.length; k++) {
                    for (let i = 1; i < data.detail.seasons[c].episode_count + 1; i++)
                        episode.push(i);
                    episodes[c] = episode
                    c++;
                    episode = []
                }
            } else {
                c = 0;
                for (let k = 0; k < temp.length; k++) {
                    for (let i = 1; i < data.detail.seasons[c].episode_count + 1; i++)
                        episode.push(i);
                    episodes[c + 1] = episode
                    c++;
                    episode = []
                }
            }

        }
    }, [seasonDropDown, episodeDropDown, nextprevbtnclicked]);
    useEffect(() => {
        console.log(theme)
        if (localStorage.getItem("userWatched")) {
            let data = JSON.parse(localStorage.getItem("userWatched"))
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
                    setTvDetails({season: data.tv[i][1], episode: data.tv[i][2]})
                } else {
                    if (id || tmdb) {
                        if (id)
                            data.tv.push([id, tvDetails.season, tvDetails.episode])
                        else data.tv.push([tmdb, tvDetails.season, tvDetails.episode])
                        localStorage.setItem("userWatched", JSON.stringify(data))
                    }
                }
        } else {
            if (id || tmdb)
                localStorage.setItem("userWatched", JSON.stringify({
                    movies: [], tv: [[id ? id : tmdb, tvDetails.season, tvDetails.episode]]
                }))
        }
    }, [id, tmdb]);
    useEffect(() => {
        if (data !== undefined) {
            if (localStorage.getItem('userWatched')) {
                let dataa = JSON.parse(localStorage.getItem("userWatched"))
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
                        if (id) dataa.tv[tvPresent] = [id, tvDetails.season, tvDetails.episode]
                        else dataa.tv[tvPresent] = [tmdb, tvDetails.season, tvDetails.episode]
                        localStorage.setItem("userWatched", JSON.stringify(dataa))
                    } else {
                        if (id || tmdb) {
                            if (id)
                                dataa.tv.push([id, tvDetails.season, tvDetails.episode])
                            else dataa.tv.push([tmdb, tvDetails.season, tvDetails.episode])
                            localStorage.setItem("userWatched", JSON.stringify(dataa))
                        }
                    }
            }
            if (tvDetails.season === 1 && tvDetails.episode === 1) {
                showPrevBtn(false)
            } else {
                showPrevBtn(true)
            }
            if (tvDetails.season === season[season.length - 1] && tvDetails.episode === episodes[tvDetails.season][episodes[tvDetails.season].length - 1]) {
                showNextBtn(false)
            } else {
                showNextBtn(true)
            }
            let inputstrings = `${data?.detail.name}season`
            let inputStringe = `${data?.detail.name}episode`
            if (localStorage.getItem(inputstrings.replace(/\s+/g, "").toLowerCase())) {
                localStorage.setItem(inputstrings.replace(/\s+/g, "").toLowerCase(), tvDetails.season)
            }
            if (localStorage.getItem(inputStringe.replace(/\s+/g, "").toLowerCase())) {
                localStorage.setItem(inputStringe.replace(/\s+/g, "").toLowerCase(), tvDetails.episode)
            }
            if (videoServer.includes("vidsrc.me")) setVideoServer(`https://vidsrc.me/embed/tv?${tmdb ? `tmdb=${tmdb}` : `imdb=${id}`}&season=${tvDetails.season}&episode=${tvDetails.episode}`)
            if (videoServer.includes("vidsrc.to")) setVideoServer(`https://vidsrc.to/embed/tv/${tmdb ? `${tmdb}` : `${id}`}/${tvDetails.season}/${tvDetails.episode}`)
            else if (videoServer.includes("moviesapi.club")) setVideoServer(`https://moviesapi.club/tv/${tmdb}-${tvDetails.season}-${tvDetails.episode}`)
            else if (videoServer.includes("blackvid.space")) setVideoServer(`https://blackvid.space/embed?tmdb=${tmdb}&season=${tvDetails.season}&episode=${tvDetails.episode}`);
        }
    }, [tvDetails]);
    //adding event listener for window to catch left click to remove light setting
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (event.target !== "iframe" && event.target.tagName.toLowerCase() !== "span") {
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
                className={`w-full  top-0 left-0 z-[997] bg-black transition duration-300 ease-in-out ${lightStatus ? 'opacity-1 fixed h-screen ' : 'opacity-0 h-0 w-0'}`}>
            </div>
            <div
                className={` w-full flex flex-col   ${lightStatus ? '' : 'h-full'} z-[999] h-full`}>
                <div
                    className={"w-full h-16 pb-2 text-3xl"}>{data?.detail.name} S{tvDetails.season} E{tvDetails.episode}</div>
                <iframe
                    src={videoServer !== 'vidsrc.to' ? videoServer : `https://vidsrc.to/embed/tv/${tmdb ? tmdb : id}/${tvDetails.season}/${tvDetails.episode}`}
                    className={"z-50"}
                    style={{width: '100%', height: '92vh'}}
                    allowFullScreen="allowfullscreen"></iframe>
                <div className={"w-full p-4 pl-0 bg-transparent flex gap-10 flex-row justify-between items-center"}>
                    <div>
                        <div className={"relative w-44 flex justify-start items-center gap-1"}>
                            <div className={"relative"}>
                                <BiSolidSkipPreviousCircle size={35} onClick={() => {
                                    setnextprevbtnclicked(true)
                                    let current_Episode = tvDetails.episode;
                                    let current_Season = tvDetails.season;
                                    if (episodes[current_Season]) {
                                        if (episodes[current_Season].indexOf(current_Episode) === 0) {
                                            if (season.indexOf(tvDetails.season) !== 0) {
                                                setTvDetails({
                                                    season: current_Season - 1,
                                                    episode: episodes[current_Season - 1][episodes[current_Season].length - 1]
                                                })
                                            }
                                        } else {
                                            setTvDetails((prev) => {
                                                return {...prev, episode: current_Episode - 1};
                                            })
                                        }
                                    }
                                }}
                                                           className={`${prevBtn ? 'block' : 'hidden'} hover:scale-125 transition control-button duration-300 ease-in-out`}/>
                                <div
                                    className={"bg-[#222222] absolute left-5 z-50 hidden w-10 text-center tooltip-div"}>
                                    Prev
                                </div>
                            </div>
                            <div className={"relative"} onClick={() => {
                                let current_Episode = tvDetails.episode;
                                let current_Season = tvDetails.season;
                                setnextprevbtnclicked(true)
                                if (episodes[tvDetails.season]) {
                                    if (episodes[tvDetails.season].indexOf(current_Episode) === episodes[tvDetails.season].length - 1) {
                                        if (season.indexOf(tvDetails.season) !== season.length - 1) {
                                            setTvDetails({season: current_Season + 1, episode: 1})
                                        }
                                    } else {
                                        setTvDetails((prev) => {
                                            return {...prev, episode: current_Episode + 1};
                                        })
                                    }
                                }
                            }
                            }>
                                <BiSolidSkipNextCircle size={35}
                                                       className={`${nextBtn ? 'block' : 'hidden'} hover:scale-125 transition control-button duration-300 ease-in-out`}/>
                                <div
                                    className={"bg-[#222222] absolute left-5 z-50 hidden w-10 text-center tooltip-div"}>
                                    Next
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`flex justify-center gap-10 items-center ${lightStatus ? 'text-white' : ''}`}>
                        <div onClick={() => switchLight(!lightStatus)}
                             className={"flex flex-row gap-1 items-center hover:text-orange-500 transition duration-300 ease-in-out hover:cursor-pointer"}>
                            <BsFillLightbulbFill/>
                            <span>Light</span>
                        </div>
                        <div className={"relative w-32 "}>
                            <div
                                className={"flex z-50 justify-center items-center bg-[#151515] dark:bg-inherit   text-white cursor-pointer outline-0 rounded  flex-row gap-2"}
                                onClick={() => {
                                    setSeasonDropDown(!seasonDropDown)
                                    setEpisodeDropDown(false)
                                }}>
                                Season {tvDetails.season}<span
                                className={"pt-1 transition duration-300 ease-in-out"}>{seasonDropDown ?
                                <AiOutlineDown/> :
                                <AiOutlineRight/>}</span>
                            </div>
                            <div
                                className={` flex-col  z-40  font-normal overflow-y-scroll  h-44  text-white w-44 absolute justify-center transition duration-300 ease-in-out items-center ${seasonDropDown ? 'translate-y-0 opacity-1' : 'translate-y-[-150%]   opacity-0'} `}>
                                <ul className={""}>
                                    {season !== [] ? season.map((season, index) => {
                                        return (
                                            <li key={index} onClick={() => {
                                                setTvDetails({season: season, episode: 1})
                                                setSeasonDropDown(false)
                                            }}
                                                className={`relative dropdown-scroll bg-app-semi-dark-blue  hover:bg-amber-700 hover:cursor-pointer pl-2 flex items-center justify-evenly w-full h-12 ${tvDetails.season === season ? 'bg-amber-700' : ''}`}>
                                                Season <span>{season}</span>
                                            </li>
                                        )
                                    }) : (<li>No Seasons</li>)
                                    }
                                </ul>
                            </div>

                        </div>
                        <div className={"relative w-32 "}>
                            <div
                                className={"flex z-50 rounded justify-center items-center bg-[#151515] dark:bg-inherit   text-white flex-row gap-2"}
                                onClick={() => {
                                    setEpisodeDropDown(!episodeDropDown)
                                    setSeasonDropDown(false)
                                }}>
                                Episode {tvDetails.episode}<span
                                className={"pt-1 transition duration-300 ease-in-out"}>{episodeDropDown ?
                                <AiOutlineDown/> :
                                <AiOutlineRight/>}</span>
                            </div>
                            <div
                                className={` flex-col   z-40 bg-app-semi-dark-blue font-normal overflow-y-scroll  h-44  text-white w-44 absolute justify-center transition duration-300 ease-in-out items-center ${episodeDropDown ? 'translate-y-0 opacity-1' : 'translate-y-[-150%]   opacity-0'} `}>
                                <ul className={""}>
                                    {episodes[tvDetails.season] ? episodes[tvDetails.season].map((episode, index) => {
                                        return (
                                            <li key={index} onClick={() => {
                                                setTvDetails(prev => {
                                                    return {...prev, episode: episode}
                                                })
                                                setEpisodeDropDown(false)
                                            }}
                                                className={`relative dropdown-scroll  hover:bg-amber-700 hover:cursor-pointer pl-2 flex items-center justify-evenly w-full h-12 ${tvDetails.episode === episode ? 'bg-amber-700' : ''}`}>
                                                Episode <span>{episode}</span>
                                            </li>
                                        )
                                    }) : (<li>No Episode</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={` ${lightStatus ? 'hidden' : 'flex'} w-full justify-start  items-center h-36`}>
                    <div className={"rounded w-full h-full flex flex-row "}>
                        <div
                            className={`dark:text-white text-black p-2 h-full text-center w-1/3`}>
                            {`You are watching `}
                            <div className={" font-bold"}>{data ? data.detail.name : ""}</div>
                            <div> If current server doesn't work please try other servers beside.</div>
                        </div>
                        <div
                            className={` w-2/3 h-full`}>
                            <div
                                className={"w-full flex flex-wrap flex-row gap-7 p-5 justify-start items-center h-10"}>
                                {servers_.map((server, index) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                if (server.servername === "Vidsrc.me")
                                                    setVideoServer(`${server.link}${tmdb ? `tmdb=${tmdb}` : `imdb=${id}`}&season=${tvDetails.season}&episode=${tvDetails.episode}`)
                                                else if (server.servername === "Vidsrc.to")
                                                    setVideoServer(`${server.link}${tmdb ? `${tmdb}` : `${id}`}/${tvDetails.season}/${tvDetails.episode}`)
                                                else if (server.servername === "Moviesapi.club")
                                                    setVideoServer(`${server.link}${tmdb}-${tvDetails.season}-${tvDetails.episode}`)
                                                else
                                                    setVideoServer(`${server.link}${tmdb}&season=${tvDetails.season}&episode=${tvDetails.episode}`);
                                            }
                                            }
                                            className={`  ${videoServer.includes(server.servername.toLowerCase()) ? 'bg-amber-700' : ''} dark:text-white hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out rounded p-3 w-max text-center h-8 `}
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
