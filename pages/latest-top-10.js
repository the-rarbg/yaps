import React from 'react'
import { Loader } from '../Common/Loader'
import { moviesTopListApi } from '../service/service';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Card from '../Common/Card';
import CardGrid from '../Common/CardGrid';
import ToastMsg from '../Common/ToastMsg';
import { CompactList, ExpandedList } from '../SVG/listing';


const LendingPage = () => {

  const router = useRouter()
  const { category, time } = router.query;
  const categoryId = category ? category.split(':')[1] : "Movies";

  let data = ["Torrents", "Movie", "TV-Show", "Games", "Music", "Anime", "Books", "Other"]

  const [movieList, setMovieList] = useState([])
  const [ListType, setListType] = useState('expanded');
  const [Filter, setFilter] = useState(false);
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const[blur,setBlur]=useState(true)

  useEffect(() => {

    fetchMovieList(categoryId);

  }, [page])


  const fetchMovieList = (categoryId) => {
    let latest = time ? time : "10D"
    setLoader(true)
    moviesTopListApi(page, categoryId, latest).then((res) => {
      console.log("page", res?.data?.top_posts_by_category)
      setLoader(false)
      setMovieList(res?.data?.top_posts_by_category)
    }).catch((err) => {
      console.log("error", err)
      ToastMsg("Some thing went wrong ", "error")
      setLoader(false)
    })

  }
  const css ={ top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',}
  return (
    <div className='text-center font-montserrat'>
       <Head>
        <title>Top 10 Movies | Yaps</title>
      </Head>
      {loader ? <Loader /> : null}
      <br />

      <span className='text-[30px]  font-bold mt-3 pt-3'>Top 10 of All Categories</span>
      <div className='flex mx-0 md:mx-16 justify-between mb-8'>


      </div>
      <div className='flex justify-center m-2 w-full relative '>
        <div className=" dark:bg-card bg-app-semi-dark-blue w-[54%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Movies</span>
        </div>
      </div>
     <div>
     <div className='w-full'>
     <div className='flex justify-end absolute md:right-[4%] right-0'>
          <div className={`px-4 py-[0.35rem] ${ListType === 'compact' ? 'text-primary bg-primary/30' : ''} rounded-xl cursor-pointer transition-all duration-200`} onClick={() => {
            setListType('compact')
          }} ><CompactList /></div>
          <div className={`px-4 py-[0.35rem] ${ListType === 'expanded' ? 'text-primary bg-primary/30' : ''} rounded-xl cursor-pointer transition-all duration-200`} onClick={() => {
            setListType('expanded')

          }} ><ExpandedList /></div>
        </div>
        </div>
        <br/>
        <br/>
        <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Movies?.map((item, index) => {
            if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
      </div>




      <div className='flex m-5 justify-center'>
        <div className="flex  dark:bg-card bg-app-semi-dark-blue  w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Anime Torrents</span>
        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>
        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Anime?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
      <div className='flex m-5 justify-center'>
        <div className="flex  dark:bg-card bg-app-semi-dark-blue  w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 TV Shows</span>
        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.TV?.map((item, index) => {
            if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId}  />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId}  />
              )
            }
          })}
        </div>
      </div>



      <div className='flex m-5 justify-center'>
        <div className="flex  dark:bg-card bg-app-semi-dark-blue  w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 XXX</span>
        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>
      {blur? <div className='opacity-100 absolute bottom-[50%] z-10 right-[30%] pl-[25px] pr-[25px] bg-[#204281] rounded-md m-auto flex justify-center ' style={css} onClick={()=>setBlur(false)} >Are You 18+ &#x1F441;</div>:null}
        <div >
        
          <div className={`flex  flex-wrap py-8 justify-evenly ${blur?"blur-md":""}`}>
          {movieList?.XXX?.map((item, index) => {
            if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} blur={blur} setBlur={setBlur}  />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} blur={blur} setBlur={setBlur} />
              )
            }
          })}
          </div>
        </div>
      </div>



      <div className='flex m-5 justify-center'>
        <div className="flex  dark:bg-card bg-app-semi-dark-blue w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Music Torrents</span>
        



        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Music?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>


      <div className='flex m-5 justify-center'>
        <div className="flex dark:bg-card bg-app-semi-dark-blue w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Books Torrents</span>
        



        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Books?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>

      



      <div className='flex m-5 justify-center'>
        <div className="flex dark:bg-card bg-app-semi-dark-blue w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Games Torrents</span>
        



        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Games?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>


      <div className='flex m-5 justify-center'>
        <div className="flex dark:bg-card bg-app-semi-dark-blue w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Documentaries Torrents</span>
        



        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Documentaries?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
            } else {
              return (
                <CardGrid key={index} item={item} categoryId={categoryId} />
              )
            }
          })}
        </div>
      </div>
      <div className='flex m-5 justify-center'>
        <div className="flex dark:bg-card bg-app-semi-dark-blue w-[50%] rounded-xl  justify-center align-middle p-2">
          <span>Top 10 Apps Torrents</span>
        



        </div>
      </div>
      <div className='w-auto mb-[3rem]  p-2 relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex  flex-wrap py-8 justify-evenly`}>
          {movieList?.Apps?.map((item, index) => {
           if (ListType === 'compact') {
              return (
                <Card key={index} item={item} categoryId={categoryId} />
              )
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
