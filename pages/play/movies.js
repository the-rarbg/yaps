import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import Head from 'next/head'
import useSWR from "swr";
import {BsFillLightbulbFill} from "react-icons/bs";
import {useTheme} from "next-themes";

const servers_ = [{
    servername: "Vidsrc.to", link: "https://vidsrc.to/embed/movie/"
}, {
    servername: "Vidsrc.me", link: "https://vidsrc.me/embed/movie?",
}, {
    servername: "Moviesapi.club", link: "https://moviesapi.club/movie/"
}, {
    servername: "Blackvid", link: "https://blackvid.space/embed?tmdb="
}]
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Movies = () => {
    const router = useRouter()
    const {id, tmdb} = router.query;
    const me = tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
    const {theme} = useTheme();
    const to = tmdb ? `${tmdb}` : `${id}`
    const [lightStatus, switchLight] = useState(false)
    const [videoServer, setVideoServer] = useState('vidsrc.to')
    const {data} = useSWR(`/api/movie/${id}`, fetcher)
    useEffect(() => {
        if (localStorage.getItem("userWatched")) {
            let data = JSON.parse(localStorage.getItem("userWatched"))
            let moviePresent = false    
            for (let i in data.movies) {
                if (id) if (data.movies[i] === id) {
                    moviePresent = true
                } else {
                    if (data.movies === tmdb) {
                        moviePresent = true
                    }
                }
            }
            if (id || tmdb) {
                if (!moviePresent) {
                    if (id)
                        data.movies.push(id)
                    else data.movies.push(tmdb)
                    localStorage.setItem("userWatched", JSON.stringify(data))
                }
            }
        } else {
            if (id || tmdb)
                localStorage.setItem("userWatched", JSON.stringify({
                    movies: [id ? id : tmdb], tv: []
                }))
        }
    }, [id, tmdb]);
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (event.target !== "iframe") {
                switchLight(false)
            }
        })
    }, [])
    return (<>
        <Head>
            <title>Play Movies | Yaps</title>
        </Head>
        <div
            className={` top-0 left-0 z-[997] bg-[#222222] transition duration-300 ease-in-out ${lightStatus ? 'opacity-1 fixed w-full h-screen ' : 'opacity-0 h-0 w-0'}`}>
        </div>
        <div className={"text-4xl"}>
            {data ? data.imdb.imdb.name : ""}
        </div>
        <div
            className={`w-full  ${lightStatus ? '' : 'h-full'} z-[999] `}>
            <div className={` w-full  flex flex-col  h-full`}>
                <iframe src={videoServer !== 'vidsrc.to' ? videoServer : servers_[0].link + to}
                        className={`z-[998] ${lightStatus ? 'absolute left-0 lg:left-[20%] h-[80vh] lg:w-2/3 w-full ' : 'w-full h-[95vh]'}`}
                        allowFullScreen="allowfullscreen"></iframe>
                <div
                    className={`${lightStatus ? 'w-1/2 absolute text-white ' : 'w-full '} p-4 pl-0 bg-transparent gap-10 z-[999] flex flex-row justify-start  top-[100%] lg:top-[90%] items-center `}>
                    <div onClick={() => switchLight(!lightStatus)}
                         className={"flex flex-row gap-1 items-center hover:text-orange-500 transition duration-300 ease-in-out hover:cursor-pointer"}>
                        <BsFillLightbulbFill/>
                        <span>Light</span>
                    </div>
                </div>
                <div className={`${lightStatus ? 'hidden' : 'flex'}  w-full flex justify-start  items-center h-36`}>
                    <div className={"rounded w-full h-full flex flex-row "}>
                        <div
                            className={`${theme === 'dark' ? 'bg-app-dark-blue' : ''} p-2 h-full  flex justify-center items-center flex-col text-center w-1/3`}>
                            {`You are watching `}
                            <div className={" font-bold"}>{data ? data.imdb.imdb.name : ""}</div>
                            <div> If current server doesn't work please try other servers beside.</div>
                        </div>
                        <div
                            className={`${theme === 'dark' ? 'bg-app-dark-blue' : ''} text-black  w-2/3 h-full`}>
                            <div
                                className={"w-full flex flex-wrap flex-row gap-7 p-5 justify-start items-center h-10"}>
                                {servers_.map((server, index) => {
                                    return (<div
                                        onClick={() => {
                                            if (server.servername === "Vidsrc.me") setVideoServer(server.link + me)
                                            else if (server.servername === "Vidsrc.to") setVideoServer(server.link + to)

                                            else setVideoServer(server.link + data?.imdb.imdb.tmdb_id);
                                        }}
                                        className={` ${videoServer.includes(server.servername.toLowerCase()) ? 'bg-amber-700' : ''} dark:text-white hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out  rounded p-3 w-max text-center h-8`}
                                        key={index}>
                                        {server.servername}
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Movies;
