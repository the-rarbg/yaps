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
                    const tvIds = JSON.parse(localStorage.getItem("userWatched")) ? JSON.parse(localStorage.getItem("userWatched")).tv : ""
                    for (let i in tvIds) {
                        if (tvIds[i] !== [])
                            await fetch(`${router.asPath}api/tv/${tvIds[i][0]}`, {
                                credentials: "include"
                            }).then(response => response.json()).then(da => {
                                watchedData.push({
                                    id: tvIds[i][0],
                                    name: da.detail.name,
                                    year: da.detail.first_air_date ? da.detail.first_air_date.split("-")[0] : "",
                                    poster_link: da.detail.backdrop_path ? `${TMDB_IMAGE_ENDPOINT}/${da.detail.backdrop_path}` : `${TMDB_IMAGE_ENDPOINT}/${da.detail.poster_path}`,
                                    type: 'tv'
                                });
                            })
                    }
                    setData(watchedData)
                    setDataLoaded(true)
                } else {
                    setDataLoaded(true)
                    changeDataStatus(true)
                }
            }
            res();
        }
        ,
        [data]
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
                                ' w-[100%] gap-5 overflow-x-scroll p-5 '
                            }>
                            <ul className={"flex gap-10 flex-row"}>
                                {
                                    data.map((data, index) => {
                                        return (<li key={index}>
                                                <CardContinueWatching category={data.type} id={data.id}
                                                                      title={data.name}
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
