import CardCompact from '../Common/CardCompact'
import CardExpanded from '../Common/CardExpanded'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SearchSVG, MovieSVG } from '../SVG/search'
import { getSearchResult } from '../service/service';
import { Loader } from '../Common/Loader'
import { CompactList, ExpandedList } from '../SVG/listing'
import ToastMsg from '../Common/ToastMsg'

let data1 = [{ name: "Movie", cat: "Movies", time: "10D" }, { name: "TV-Show", cat: "TV", time: "10D" }, { name: "Games", cat: "Games", time: "10D" }, { name: "Music", cat: "Music", time: "10D" }, { name: "Anime", cat: "Anime", time: "10D" }, { name: "Books", cat: "Books", time: "10D" }, { name: "Other", cat: "Other", time: "10D" }, { name: "XXX", cat: "XXX", time: "1D" }]


const Home = () => {
  const router = useRouter()

  const [movieList, setMovieList] = useState([])
  const [search, setSearch] = useState(false)
  const [loader, setLoader] = useState(false)
  const [ListType, setListType] = useState('expanded');
  const [searchSuccess, setSearchSuccess] = useState(false)
  const[checkboxInput,setCheckboxInput]=useState([])

  const searchResult = (e) => {
    e.preventDefault()
    setLoader(true)
    getSearchResult(search,checkboxInput).then((res) => {
      setSearchSuccess(true)

      setLoader(false)
      setMovieList(res.data.results)
    }).catch((err) => {
      console.log("error", err)
      
      ToastMsg("Some thing went wrong ", "error")
      setLoader(false)
    })

  }
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckboxInput([...checkboxInput, value]);
    } else {
      setCheckboxInput(checkboxInput.filter((item) => item !== value));
    }
  };

  return (
    <div className="container  mx-auto py-3 font-medium bg-transparent min-h-screen  justify-center text-center font-montserrat">
      {loader ? <Loader /> : null}
      <div>
        <p className='text-[3rem] md:text-[6rem] font-bold leading-[3.5rem] md:leading-[7rem] pt-16'> This World.<br />At Your Fingertips.</p>
        <div>

          <form onSubmit={(e) => searchResult(e)} className='w-10/12 md:w-1/2 mx-auto flex my-10 items-center border-b-[1.5px] border-primary px-1'>
            <input className='bg-transparent w-full py-4 font-light text-lg outline-none placeholder:font-montserrat font-montserrat' placeholder='Start typing what you want ?' onChange={(e) => setSearch(e.target.value)} />
             <div onClick={(e) => { searchResult(e) }}>
              <SearchSVG />
            </div>
          </form>
          <div className='mx-8 flex text-center justify-center'>
            <div className='font-thin flex flex-wrap justify-evenly'>
              {
                data1.map((item, index) => {
                  return (
                    <label key={index} className="checkbox">
                      <input type="checkbox" name={item?.name} value={item?.cat} className='w-4 h-4 rounded checked:bg-primary checked:border-primary border border-primary' onChange={handleCheckboxChange} checked={checkboxInput?.includes(item?.cat)} />
                      <span>{item?.name}</span>
                    </label>

                  )
                })
              }
            </div>
          </div>
          <br />

          {searchSuccess ?
            <div className='flex justify-center m-2 w-[98%] relative'>
              <div className=" bg-off-white/10 w-[64%] rounded-xl  justify-center align-middle p-2">
                {movieList.length > 0 ? <span>Your Search Result</span> : <span>No data found for : "{search}"</span>}
              </div>

              {movieList.length > 0 ? <div className='flex justify-end absolute right-0'>
                <div className={`px-4 py-[0.35rem] ${ListType === 'compact' ? 'text-primary bg-primary/30' : ''} rounded-xl cursor-pointer transition-all duration-200`} onClick={() => {
                  setListType('compact')
                }} ><CompactList /></div>
                <div className={`px-4 py-[0.35rem] ${ListType === 'expanded' ? 'text-primary bg-primary/30' : ''} rounded-xl cursor-pointer transition-all duration-200`} onClick={() => {
                  setListType('expanded')

                }} ><ExpandedList /></div>
              </div>
                : null}


            </div> : null}
          <div className={`flex-1 flex-wrap pl-6 py-8 justify-center`}>
            {movieList?.map((item, index) => {
              if (ListType === 'compact') {
                return (
                  <CardCompact key={index} item={item} />
                )
              } else {
                return (
                  <CardExpanded  key={index} item={item} />
                )
              }
            })}

          </div>

          <br />

          <div className='md:px-0 w-full md:w-8/12 mx-auto text-center flex flex-wrap gap-4 justify-center'>
            {
              data1.map((item, index) => {
                return (
                  <div className='relative' key={index}>
                    <div key={index} onClick={() => window.location.href=`/get-posts/category:${item?.cat}?time=${item?.time}`} className={`cursor-pointer w-[150px] md:w-[195px] h-[115px] md:pl-[26px] md:pr-[161px] pt-7 pb-16 bg-off-white/10 rounded-lg border-off-white/30 flex-col justify-start items-center md:items-start gap-3.5 inline-flex hover:bg-primary/10 border-[1px] hover:border-primary/50 group `}>
                    <div className="w-[30px] h-[30px] p-[2.50px] justify-center items-center inline-flex text-off-white group-hover:text-primary">  <MovieSVG /></div>
                    <div className="text-off-white group-hover:text-primary text-opacity-80 text-[13px] w-20 text-center md:text-start leading-[0px] ">{item?.name}</div>
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
