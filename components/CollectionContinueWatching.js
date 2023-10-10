import {useEffect, useState} from "react";
import CardContinueWatching from "./CardContinueWatching";
import {TMDB_IMAGE_ENDPOINT} from "../utils";
import {useRouter} from "next/router";
import Heading from "./Heading";
import Loading from "./Loading";


export default function Collection({}) {
    const [data, setData] = useState([]);
    const router = useRouter();
    const [dataLoaded, setDataLoaded] = useState(false)
    const [dataEmpty, changeDataStatus] = useState(false)
    const clear = () => {
        setData([]);
        changeDataStatus(true);
        if (localStorage) {
            localStorage.removeItem("userWatched");
        }
    }
    const clear_movie = (id, category) => {
        setDataLoaded(false)
        if (localStorage) {
            if (category === "tv") {
                let data = JSON.parse(localStorage.getItem("userWatched")).tv;
                let out = []
                for (let i in data) {
                    if (data[i][0] !== id) {
                        out.push(data[i])
                    }
                }
                let new_data = {movies: JSON.parse(localStorage.getItem("userWatched")).movies, tv: out}
                localStorage.setItem("userWatched", JSON.stringify(new_data));
            } else {
                let data = JSON.parse(localStorage.getItem("userWatched")).movies;
                let out = []
                for (let i in data) {
                    if (data[i] !== id) {
                        out.push(data[i])
                    }
                }
                let new_data = {tv: JSON.parse(localStorage.getItem("userWatched")).tv, movies: out}
                localStorage.setItem("userWatched", JSON.stringify(new_data));
            }
        }

    }
    /*Note : Currently fetching the data for tv and movie one by one based on the id stored in local storage. */
    useEffect(() => {
            const res = async () => {
                if (localStorage.getItem("userWatched")) {
                    if (JSON.parse(localStorage.getItem("userWatched")).movies.length === 0 && JSON.parse(localStorage.getItem("userWatched")).tv.length === 0) {
                        changeDataStatus(true)
                        setDataLoaded(true)
                    } else {
                        const movieIds = JSON.parse(localStorage.getItem("userWatched")).movies
                        let watchedData = []
                        for (let i in movieIds) {
                            await fetch(`${router.asPath}api/movie/${movieIds[i]}`, {
                                credentials: "include"
                            }).then(response => response.json()).then(da => {
                                watchedData.push({
                                    id: movieIds[i],
                                    name: da.detail.original_title,
                                    year: da.detail.release_date.split('-')[0],
                                    poster_link: da.detail.backdrop_path ? `${TMDB_IMAGE_ENDPOINT}/${da.detail.backdrop_path}` : `${TMDB_IMAGE_ENDPOINT}/${da.detail.poster_path}`,
                                    type: 'movie'
                                });
                            })
                        }
                        const tvIds = JSON.parse(localStorage.getItem("userWatched")) ? JSON.parse(localStorage.getItem("userWatched")).tv : ""
                        for (let i in tvIds) {
                            if (tvIds[i] !== [])
                                await fetch(`${router.asPath}api/tv/${tvIds[i][0]}`, {
                                    credentials: "include"
                                }).then(response => response.json()).then(da => {
                                    watchedData.push({
                                        id: tvIds[i][0],
                                        name: da.detail.name + ` S${tvIds[i][1]} E${tvIds[i][2]}`,
                                        year: da.detail.first_air_date ? da.detail.first_air_date.split("-")[0] : "",
                                        poster_link: da.detail.backdrop_path ? `${TMDB_IMAGE_ENDPOINT}/${da.detail.backdrop_path}` : `${TMDB_IMAGE_ENDPOINT}/${da.detail.poster_path}`,
                                        type: 'tv'
                                    });
                                })
                        }
                        setData(watchedData)
                        setDataLoaded(true)
                        changeDataStatus(false)
                    }
                } else {
                    setDataLoaded(true)
                    changeDataStatus(true)
                }
            }
            res();
        }
        ,
        [dataLoaded]
    )
    ;
    return (
        <div className={"relative"}>
            {dataLoaded ? (
                !dataEmpty ?
                    <section
                        className={
                            'mb-6 md:mb-10'
                        }>
                        <Heading title={"Continue Watching"} clearHistoryFunction={clear} href={""} isHomePage
                                 media_type={"all"}
                                 iscontinue_watching={true}/>
                        <section
                            className={
                                ' w-[100%] gap-5 overflow-x-scroll pb-2 '
                            }>
                            <ul className={"flex gap-10 flex-row"}>
                                {
                                    data.map((data, index) => {
                                        return (<li key={index}>
                                                <CardContinueWatching category={data.type} id={data.id}
                                                                      title={data.name}
                                                                      clearHistoryFunction={clear_movie}
                                                                      year={data.year}
                                                                      src={data.poster_link}/>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </section>
                    </section>
                    : ""
            ) : <Loading/>}
        </div>
    )
}
