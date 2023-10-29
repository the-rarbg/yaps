import {SearchSVG} from '../../SVG/search'
import React, {useEffect, useState} from 'react'

import {getSearchResult, moviesListApi} from '../../service/service'
import ToastMsg from '../../Common/ToastMsg'
import {Loader} from '../../Common/Loader'
import {useRouter} from 'next/router'
import CardExpanded from '../../Common/CardExpanded'
import {CompactList, ExpandedList} from '../../SVG/listing'
import CardCompact from '../../Common/CardCompact'
import Head from 'next/head'
import {useTheme} from 'next-themes'

const Latest = () => {
    const router = useRouter()
    const {category} = router.query
    const categoryId = category ? category.split(':')[1] : null

    // { name: "TV-Show", cat: "TV", time: "10D", color: "#7a1fb8" },
    // { name: "Games", cat: "Games", time: "10D", color: "#AD1F2F" },
    // { name: "Music", cat: "Music", time: "10D", color: "#411eed" },
    // { name: "Anime", cat: "Anime", time: "10D", color: "#001F1F" },
    // { name: "Books", cat: "Books", time: "10D", color: "#fD1Df1" },
    // { name: "XXX", cat: "XXX", time: "10D", color: "#Fc3799" },  
    // { name: "Other", cat: "Other", time: "10D", color: "#ff0000" }]
    let data = [
        {name: 'Movie', cat: 'Movies', time: '10D', color: '#ee7633'},
        {
            name: 'TV-Show',
            cat: 'TV',
            time: '10D',
            light_color: '#7affb8',
            dark_color: '#7a1fb8',
        },
        {
            name: 'Games',
            cat: 'Games',
            time: '10D',
            light_color: '#ADFF2F',
            dark_color: '#AD1F2F',
        },
        {
            name: 'Music',
            cat: 'Music',
            time: '10D',
            light_color: '#418eed',
            dark_color: '#411eed',
        },
        {
            name: 'Anime',
            cat: 'Anime',
            time: '10D',
            light_color: '#00FFFF',
            dark_color: '#001F1F',
        },
        {
            name: 'Books',
            cat: 'Books',
            time: '10D',
            light_color: '#CDCD00',
            dark_color: '#fD1Df1',
        },
        {
            name: 'XXX',
            cat: 'XXX',
            time: '10D',
            light_color: '#FF00FF',
            dark_color: '#Fc3799',
        },
        {
            name: 'Other',
            cat: 'Other',
            time: '10D',
            light_color: '#ebad32',
            dark_color: '#ff0000',
        },
    ]
    const [movieList, setMovieList] = useState([])
    const [ListType, setListType] = useState('expanded')
    const [Filter, setFilter] = useState(false)
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [cat, setCat] = useState(categoryId)
    const [search, setSearch] = useState(false)
    const {theme, setTheme} = useTheme()
    setTheme(theme)
    useEffect(() => {
        fetchMovieList(cat)
    }, [page])
    useEffect(() => {
        fetchMovieListRefresh(category?.split(':')[1])
        setCat(category?.split(':')[1])
    }, [category])

    const fetchMovieList = cat => {
        let category = cat ? cat : 'Movies'
        let latest = ''
        setLoader(true)
        moviesListApi(page, category, latest)
            .then(res => {
                console.log('page', res?.data?.results)
                setLoader(false)
                setMovieList([...movieList, ...res.data.results])
            })
            .catch(err => {
                console.log('error', err)
                ToastMsg('Some thing went wrong ', 'error')
                setLoader(false)
            })
    }

    const fetchMovieListRefresh = categoryId => {
        let latest = ''
        setLoader(true)
        moviesListApi(page, categoryId, latest)
            .then(res => {
                console.log('page', res?.data?.results)
                setLoader(false)
                setMovieList(res.data.results)
            })
            .catch(err => {
                console.log('error', err)
                ToastMsg('Some thing went wrong ', 'error')
                setLoader(false)
            })
    }

    const searchResult = e => {
        e.preventDefault()
        if (!movieList) {
            setLoader(true)
            getSearchResult(search)
                .then(res => {
                    console.log('page', res?.data?.results)
                    setLoader(false)
                    setMovieList(res.data.results)
                })
                .catch(err => {
                    console.log('error', err)
                    ToastMsg('Some thing went wrong ', 'error')
                    setLoader(false)
                })
        }
    }

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >
            document.body.scrollHeight - 150
        ) {
            setTimeout(() => {
                setPage(page + 1)
            }, 100)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [page])

    return (
        <div className='font-montserrat text-center'>
            <Head>
                <title>Browse | Yaps</title>
            </Head>
            {!movieList.length > 0 ? <Loader/> : null}
            <div className='w-full justify-end'>
                <form
                    onSubmit={e => {
                        searchResult(e)
                    }}
                    className='mx-auto my-3 flex w-10/12 items-center border-b-[1px] border-primary px-1 md:w-1/2'>
                    <input
                        className='placeholder:font-montserrat font-montserrat w-full bg-transparent py-4 text-lg font-light outline-none placeholder:text-black dark:placeholder:text-app-pure-white'
                        onChange={e => {
                            setSearch(e.target.value)
                        }}
                        placeholder='Start typing what you want ?'
                    />
                    <div
                        className='cursor-pointer'
                        onClick={e => {
                            searchResult(e)
                            router.push(`/get-posts/keywords:${search}/`)
                        }}>
                        <SearchSVG/>
                    </div>
                </form>
                <div className='mx-8  flex flex-wrap justify-center text-center'>
                    {data.map((item, index) => {
                        return (
                            <div
                                onClick={() => {
                                    setCat(item?.cat)
                                    setPage(1)
                                    router.push(`/get-posts/category:${item?.cat}`)
                                }}
                                key={index}
                                className={`category-text bg-primary/15 mx-2 my-1 flex cursor-pointer rounded px-2 py-0.5 text-[15px] font-light lowercase hover:bg-[#008000] !hover:text-[${item.hover_color}] `}
                                style={{
                                    color:
                                        cat === item?.cat
                                            ? '#fff'
                                            : theme === 'light'
                                                ? item?.dark_color
                                                : item?.light_color,
                                    background: cat === item?.cat ? '#008000' : '',
                                }}>
                                <label className='cursor-pointer'>{item?.name} </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='w-full'>
                <div className='absolute right-0 flex justify-end md:right-[4%]'>
                    <div
                        className={`px-4 py-[0.35rem] ${
                            ListType === 'compact' ? 'bg-primary/30 text-primary' : ''
                        } cursor-pointer rounded-xl transition-all duration-200`}
                        onClick={() => {
                            setListType('compact')
                        }}>
                        <CompactList/>
                    </div>
                    <div
                        className={`px-4 py-[0.35rem] ${
                            ListType === 'expanded' ? 'bg-primary/30 text-primary' : ''
                        } cursor-pointer rounded-xl transition-all duration-200`}
                        onClick={() => {
                            setListType('expanded')
                        }}>
                        <ExpandedList/>
                    </div>
                </div>
            </div>
            <br/> <br/>
            <div className='relative mb-[3rem]   flex w-auto overflow-hidden  rounded-xl text-center'>
                <div className={`flex w-full flex-wrap justify-evenly p-2  py-8  `}>
                    {movieList?.map((item, index) => {
                        if (ListType === 'compact') {
                            return (
                                <CardCompact key={index} item={item} categoryId={categoryId}/>
                            )
                        } else {
                            return (
                                <CardExpanded key={index} item={item} categoryId={categoryId}/>
                            )
                        }
                    })}
                    {movieList.length === 0 ? <h1>No Data Found </h1> : null}
                </div>
            </div>
        </div>
    )
}

export default Latest
