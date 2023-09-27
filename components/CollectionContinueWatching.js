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
    /*TODO : Currently fetching the data for tv and movie one by one based on the id stored in local storage. */
    useEffect(() => {
            const res = async () => {
                if (localStorage.getItem("userWatched")) {
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
                    const tvIds = JSON.parse(localStorage.getItem("userWatched")).tv
                    for (let i in tvIds) {
                        await fetch(`${router.asPath}api/tv/${tvIds[i][0]}`, {
                            credentials: "include"
                        }).then(response => response.json()).then(da => {
                            watchedData.push({
                                id: tvIds[i][0],
                                name: da.detail.name,
                                year: da.detail.first_air_date.split("-")[0],
                                poster_link: da.detail.backdrop_path ? `${TMDB_IMAGE_ENDPOINT}/${da.detail.backdrop_path}` : `${TMDB_IMAGE_ENDPOINT}/${da.detail.poster_path}`,
                                type: 'tv'
                            });
                        })
                    }
                    setData(watchedData)
                    setDataLoaded(true)
                }
            }
            res();
        }
        ,
        []
    )
    ;
    return (
        <div className={"relative"}>
            {dataLoaded ? (
                <section
                    className={
                        'mb-6 md:mb-10'
                    }>
                    <Heading title={"Continue Watching"} href={""} isHomePage media_type={"all"}
                             iscontinue_watching={true}/>
                    <section
                        className={
                            ' w-[100%] gap-5 overflow-x-scroll p-5 '
                        }>
                        <ul className={"flex gap-10 flex-row"}>
                            {
                                data.map((data, index) => {
                                    return (<li> key={index}
                                            <CardContinueWatching key={index} category={data.type} id={data.id} title={data.name}
                                                                  year={data.year}
                                                                  src={data.poster_link}/>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </section>
                </section>
            ) : <Loading/>}
        </div>
    )
}
