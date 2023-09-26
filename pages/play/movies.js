import React, {useState} from 'react'
import {useRouter} from 'next/router';
import Head from 'next/head'
import useSWR from "swr";
import FilmGenres from '../../components/FilmGenres'
import FilmHeading from '../../components/FilmHeading'
import FilmImage from '../../components/FilmImage'
import FilmInfo from '../../components/FilmInfo'
import FilmRating from '../../components/FilmRating'
import FilmSynopsis from '../../components/FilmSynopsis'
import {renderLanguage, renderLength, renderRating, renderStatus, renderYear} from "../movie/[id]";
import {AiOutlineExpand} from "react-icons/ai";

const servers_ = [
    {
        servername: "Vidsrc.me", link: "https://vidsrc.me/embed/movie?",
    },
    {
        servername: "Vidsrc.to", link: "https://vidsrc.to/embed/movie/"
    },
    {
        servername: "Moviesapi.club", link: "https://moviesapi.club/movie/"
    },
    {
        servername: "Blackvid", link: "https://blackvid.space/embed?tmdb="
    }, {
        servername: "Superembed", link: "https://multiembed.mov/directstream.php?video_id="
    }
]
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Movies = () => {
    const router = useRouter()
    const {id, tmdb} = router.query;
    const me = tmdb ? `tmdb=${tmdb}` : `imdb=${id}`
    const to = tmdb ? `${tmdb}` : `${id}`
    const [videoServer, setVideoServer] = useState('')
    const {data, error} = useSWR(`/api/movie/${id}`, fetcher)
    const [MovieDetailsHidden, setMovieDetailsHidden] = useState(false)
    console.log(data);
    return (
        <>
            <Head>
                <title>Play Movies | Yaps</title>
            </Head>
            <div
                className={`${MovieDetailsHidden ? 'lg:grid-row-1 lg:grid-cols-2' : 'lg:grid-row-2 lg:grid-cols-1'} grid w-full h-full  grid-cols-1 grid-rows-2`}>
                <div className={` ${MovieDetailsHidden ? 'w-full' : 'min-w-2/3 '} flex flex-col  h-full`}>
                    <iframe src={videoServer ? videoServer : servers_[0].link + me}
                            className={`w-full ${MovieDetailsHidden ? 'h-[60vh]' : 'h-[95vh]'}`}
                            allowFullScreen="allowfullscreen"></iframe>
                    <div className={"w-full p-4 pl-0 bg-transparent flex flex-row justify-start items-center"}>
                        <div onClick={() => setMovieDetailsHidden(!MovieDetailsHidden)}
                             className={"flex flex-row gap-1 items-center hover:text-orange-500 transition duration-300 ease-in-out hover:cursor-pointer"}>
                            <AiOutlineExpand/>
                            <span>Expand</span>
                        </div>
                    </div>
                    <div className={"  w-full flex justify-start  items-center h-36"}>
                        <div className={"rounded w-full h-full flex flex-row "}>
                            <div
                                className={"p-2 h-full bg-app-shady-white dark:bg-app-grey dark:text-black text-center w-1/3"}>
                                {`You are watching `}
                                <div className={" font-bold"}>{data ? data.imdb.imdb.name : ""}</div>
                                <div> If current server doesn't work please try other servers beside.</div>
                            </div>
                            <div className={" bg-app-pure-white text-black  w-2/3 h-full"}>
                                <div
                                    className={"w-full flex flex-wrap flex-row gap-7 p-5 justify-start items-center h-10"}>
                                    {servers_.map((server, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    if (server.servername === "Vidsrc.me")
                                                        setVideoServer(server.link + me)
                                                    else if (server.servername === "Vidsrc.to" || server.servername === "Superembed")
                                                        setVideoServer(server.link + to)
                                                    else
                                                        setVideoServer(server.link + data?.imdb.imdb.tmdb_id);
                                                }
                                                }
                                                className={"dark:bg-app-semi-dark-blue dark:text-white hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out bg-app-shady-white rounded p-3 w-max text-center h-8"}
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
                <div className={` ${MovieDetailsHidden ? '' : 'hidden'} min-w-1/3 h-full`}>
                    <section
                        className='flex flex-row ml-10 lg:mt-0 mt-10 lg:flex-col lg:justify-end justify-center items-center lg:items-baseline'>
                        <FilmImage
                            src={data?.detail?.poster_path}
                            title={data?.detail?.title}
                        />
                        <section>
                            <FilmHeading
                                from={'movie'}
                                tagline={data?.detail?.tagline}
                                title={data?.detail?.title}
                            />
                            <FilmRating number={renderRating(data?.detail?.vote_average)}/>
                            <FilmSynopsis synopsis={data?.detail?.overview}/>
                            <FilmInfo
                                media_type={data?.imdb.imdb.content_type.toLowerCase()}
                                language={renderLanguage(data?.detail?.spoken_languages || [])}
                                length={renderLength(data?.detail?.runtime)}
                                status={renderStatus(data?.detail?.status)}
                                year={renderYear(data?.detail?.release_date)}
                            />
                            <FilmGenres genres={data?.detail?.genres || []}/>
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}
export default Movies;
