import CardCompact from '../Common/CardCompact'
import CardExpanded from '../Common/CardExpanded'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { MovieSVG, SearchSVG } from '../SVG/search'
import { getSearchResult } from '../service/service'
import { Loader } from '../Common/Loader'
import { CompactList, ExpandedList } from '../SVG/listing'
import ToastMsg from '../Common/ToastMsg'
import Head from 'next/head'
import { useTheme } from 'next-themes'
let data1 = [
  { name: 'Movie', cat: 'Movies', time: '10D' },
  { name: 'TV-Show', cat: 'TV', time: '10D' },
  {
    name: 'Games',
    cat: 'Games',
    time: '10D',
  },
  { name: 'Music', cat: 'Music', time: '10D' },
  { name: 'Anime', cat: 'Anime', time: '10D' },
  {
    name: 'Books',
    cat: 'Books',
    time: '10D',
  },
  { name: 'Other', cat: 'Other', time: '10D' },
  { name: 'XXX', cat: 'XXX', time: '1D' },
]

const Home = () => {
  const router = useRouter()

  const [movieList, setMovieList] = useState([])
  const [search, setSearch] = useState(false)
  const [loader, setLoader] = useState(false)
  const [ListType, setListType] = useState('expanded')
  const [searchSuccess, setSearchSuccess] = useState(false)
  const [checkboxInput, setCheckboxInput] = useState([])
  const [searchbarclicked, setSearchBar] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setTheme(theme)
  })
  const searchResult = e => {
    e.preventDefault()
    setLoader(true)
    getSearchResult(search, checkboxInput)
      .then(res => {
        setSearchSuccess(true)
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
  const handleCheckboxChange = event => {
    const { value, checked } = event.target
    console.log('event', checked, value)
    if (checked) {
      setCheckboxInput([...checkboxInput, value])
    } else {
      setCheckboxInput(checkboxInput.filter(item => item !== value))
    }
  }

  return (
    <div className='font-montserrat  container mx-auto min-h-screen justify-center bg-transparent  py-3 text-center font-light'>
      <Head>
        <title>Search | Yaps</title>
      </Head>
      {loader ? <Loader /> : null}
      <div>
        <p className='pt-16 text-[3rem] font-bold leading-[3.5rem] md:text-[6rem] md:leading-[7rem]'>
          {' '}
          This World.
          <br />
          At Your Fingertips.
        </p>
        <div>
          <form
            onSubmit={e => searchResult(e)}
            className={`mx-auto my-10 flex w-10/12 items-center justify-center border-b-[1.5px] border-primary  px-1 md:w-1/2`}>
            <input
              className='placeholder:font-montserrat font-montserrat w-full bg-transparent py-4 text-lg font-light outline-none placeholder:text-black dark:placeholder:text-app-pure-white'
              placeholder='Start typing what you want ?'
              onChange={e => setSearch(e.target.value)}
            />
            <div
              onClick={e => {
                searchResult(e)
              }}>
              <SearchSVG />
            </div>
          </form>
          <div className='mx-8 flex justify-center text-center'>
            <div className='flex flex-row flex-wrap items-center justify-evenly font-thin'>
              {data1.map((item, index) => {
                return (
                  <label key={index} className='checkbox'>
                    <input
                      type='checkbox'
                      name={item?.name}
                      value={item?.cat}
                      className='h-4 w-4 rounded border border-blue-800 checked:bg-primary dark:border-primary dark:checked:border-primary'
                      onChange={handleCheckboxChange}
                      checked={checkboxInput?.includes(item?.cat)}
                    />
                    <span
                      className={
                        '!text-app-dark-blue dark:!text-app-pure-white  '
                      }>
                      {item?.name}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
          <br />

          {searchSuccess ? (
            <div className='relative m-2 flex w-[98%] justify-center'>
              <div className=' w-[64%] justify-center rounded-xl  bg-off-white/10 p-2 align-middle'>
                {movieList.length > 0 ? (
                  <span>Your Search Result</span>
                ) : (
                  <span>No data found for : "{search}"</span>
                )}
              </div>

              {movieList.length > 0 ? (
                <div className='absolute right-0 flex justify-end'>
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
                      ListType === 'expanded'
                        ? 'bg-primary/30 text-primary'
                        : ''
                    } cursor-pointer rounded-xl transition-all duration-200`}
                    onClick={() => {
                      setListType('expanded')
                    }}>
                    <ExpandedList />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className={`flex-1 flex-wrap justify-center py-8 pl-6`}>
            {movieList?.map((item, index) => {
              if (ListType === 'compact') {
                return <CardCompact key={index} item={item} />
              } else {
                return <CardExpanded key={index} item={item} />
              }
            })}
          </div>

          <br />

          <div className='mx-auto flex w-full flex-wrap justify-center gap-4 text-center md:w-8/12 md:px-0'>
            {data1.map((item, index) => {
              return (
                <div
                  className='relative bg-[#f3f3f3] shadow-2xl dark:bg-app-dark-blue dark:shadow-[0px]'
                  key={index}>
                  <div
                    key={index}
                    onClick={() =>
                      (window.location.href = `/get-posts/category:${item?.cat}?time=${item?.time}`)
                    }
                    className={`group inline-flex h-[115px] w-[150px] cursor-pointer flex-col items-center justify-start gap-3.5 rounded-lg border-[0] bg-app-dark-blue pb-16 pt-7 transition duration-300 ease-in-out hover:scale-[1.05] hover:bg-[#18141f] hover:text-white dark:border-off-white/30 dark:bg-off-white/10 dark:hover:border-primary/50 dark:hover:bg-primary/10 md:w-[195px] md:items-start md:pl-[26px] md:pr-[161px] `}>
                    <div className='inline-flex h-[30px] w-[30px] items-center justify-center p-[2.50px] text-off-white group-hover:text-primary'>
                      <MovieSVG />
                    </div>
                    <div className='w-20 text-center text-[13px] leading-[0px] text-off-white text-opacity-80 hover:text-app-pure-white dark:hover:text-app-dark-blue dark:group-hover:text-primary md:text-start '>
                      {item?.name}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
