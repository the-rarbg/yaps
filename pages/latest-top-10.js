import React from 'react'
import { Loader } from '../Common/Loader'
import { moviesTopListApi } from '../service/service'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Card from '../Common/Card'
import CardGrid from '../Common/CardGrid'
import ToastMsg from '../Common/ToastMsg'
import { CompactList, ExpandedList } from '../SVG/listing'

const LendingPage = () => {
  const router = useRouter()
  const { category, time } = router.query
  const categoryId = category ? category.split(':')[1] : 'Movies'

  let data = [
    'Torrents',
    'Movie',
    'TV-Show',
    'Games',
    'Music',
    'Anime',
    'Books',
    'Other',
  ]

  const [movieList, setMovieList] = useState([])
  const [ListType, setListType] = useState('expanded')
  const [Filter, setFilter] = useState(false)
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [blur, setBlur] = useState(true)

  useEffect(() => {
    fetchMovieList(categoryId)
  }, [page])

  const fetchMovieList = categoryId => {
    let latest = time ? time : '10D'
    setLoader(true)
    moviesTopListApi(page, categoryId, latest)
      .then(res => {
        console.log('page', res?.data?.top_posts_by_category)
        setLoader(false)
        setMovieList(res?.data?.top_posts_by_category)
      })
      .catch(err => {
        console.log('error', err)
        ToastMsg('Some thing went wrong ', 'error')
        setLoader(false)
      })
  }
  const css = {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
  return (
    <div className='font-montserrat z-10 !overflow-visible text-center'>
      <Head>
        <title>Top 10 Movies | Yaps</title>
      </Head>
      {loader ? <Loader /> : null}
      <br />

      <span className='mt-3  pt-3 text-[30px] font-bold'>
        Top 10 of All Categories
      </span>
      <div className='mx-0 mb-8 flex justify-between md:mx-16'></div>
      <div className='relative m-2 flex w-full justify-center '>
        <div className='  flex w-[54%] justify-center rounded-xl bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Movies</span>
        </div>
      </div>
      <div className='z-10 !overflow-visible'>
        <div className='z-10  w-full !overflow-visible'>
          <div className='absolute right-0 z-10 flex justify-end md:right-[4%]'>
            <div
              className={`px-4 py-[0.35rem] ${
                ListType === 'compact' ? 'bg-primary/30 text-primary' : ''
              } cursor-pointer rounded-xl transition-all duration-200`}
              onClick={() => {
                setListType('compact')
              }}>
              <CompactList />
            </div>
            <div
              className={`px-4 py-[0.35rem] ${
                ListType === 'expanded' ? 'bg-primary/30 text-primary' : ''
              } cursor-pointer rounded-xl transition-all duration-200`}
              onClick={() => {
                setListType('expanded')
              }}>
              <ExpandedList />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className='z-1 relative  mb-[3rem] flex w-auto  overflow-visible rounded-xl p-2 text-center'>
          <div
            className={`z-1 flex flex-wrap justify-evenly overflow-visible py-8`}>
            {movieList?.Movies?.map((item, index) => {
              if (ListType === 'compact') {
                return <Card key={index} item={item} categoryId={categoryId} />
              } else {
                return (
                  <CardGrid key={index} item={item} categoryId={categoryId} />
                )
              }
            })}
          </div>
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className=' flex w-[50%]  justify-center rounded-xl  bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Anime Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Anime?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
      <div className='m-5 flex justify-center'>
        <div className='  flex w-[50%]  justify-center rounded-xl bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 TV Shows</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.TV?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className='flex w-[50%]  justify-center rounded-xl  bg-app-shady-white p-2   align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 XXX</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        {blur ? (
          <div
            className='absolute bottom-[50%] right-[30%] z-10 m-auto flex justify-center rounded-md bg-[#204281] pl-[25px] pr-[25px] opacity-100 '
            style={css}
            onClick={() => setBlur(false)}>
            Are You 18+ &#x1F441;
          </div>
        ) : null}
        <div>
          <div
            className={`flex  flex-wrap justify-evenly py-8 ${
              blur ? 'blur-md' : ''
            }`}>
            {movieList?.XXX?.map((item, index) => {
              if (ListType === 'compact') {
                return (
                  <Card
                    key={index}
                    item={item}
                    categoryId={categoryId}
                    blur={blur}
                    setBlur={setBlur}
                  />
                )
              } else {
                return (
                  <CardGrid
                    key={index}
                    item={item}
                    categoryId={categoryId}
                    blur={blur}
                    setBlur={setBlur}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className='flex w-[50%] justify-center rounded-xl bg-app-shady-white p-2   align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Music Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Music?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className='flex w-[50%] justify-center rounded-xl  bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Books Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Books?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className='flex w-[50%] justify-center rounded-xl  bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Games Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Games?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>

      <div className='m-5 flex justify-center'>
        <div className='flex w-[50%] justify-center rounded-xl  bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Documentaries Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Documentaries?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
      <div className='m-5 flex justify-center'>
        <div className='flex  w-[50%] justify-center rounded-xl  bg-app-shady-white p-2 align-middle dark:bg-app-semi-dark-blue'>
          <span>Top 10 Apps Torrents</span>
        </div>
      </div>
      <div className='relative mb-[3rem]  flex w-auto overflow-visible rounded-xl p-2 text-center'>
        <div className={`flex  flex-wrap justify-evenly py-8`}>
          {movieList?.Apps?.map((item, index) => {
            if (ListType === 'compact') {
              return <Card key={index} item={item} categoryId={categoryId} />
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default LendingPage
