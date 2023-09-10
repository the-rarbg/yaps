/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import {  useState } from 'react'
import { FaImdb, FaLink, FaPlay } from 'react-icons/fa'



 const  FilmResources = (props)=> {
  const router = useRouter()
const [loader,setLoader]=useState(false)
const handlegetLink =()=>{
  props?.handleClose()
}


  return (
    
    <div className='mb-10 flex flex-wrap'>
    
       
        {!props?.imdb ? null : (
       <a
          
       onClick={()=>handlegetLink()}
       className='mb-4 mr-4 flex w-40 cursor-pointer items-center justify-between rounded-md border-none bg-app-greyish-blue py-3 px-8 text-sm font-medium text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue'
      
       rel='noreferrer'
     >
       <p>Download</p>
       <FaLink className='text-base' />
     </a>
      )}


     
      {!props?.imdb ? null : (
        <a
          href={`https://www.imdb.com/title/${props?.imdb}`}
          className='mb-4 flex w-40 cursor-pointer items-center justify-between rounded-md border-none bg-app-greyish-blue py-3 px-8 text-sm font-medium text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue'
          target='_blank'
          rel='noreferrer'
        >
          <p>IMDB</p>
          <FaImdb className='text-base' />
        </a>
      )}
      {/* <a
        href={trailer}
        className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md border-none bg-app-semi-dark-blue py-4 px-8 text-sm font-medium text-app-pure-white hover:bg-app-greyish-blue">
        <p>Trailer</p>
        <FaPlay className="text-base" />
      </a> */}
    </div>
  )
}

export default FilmResources