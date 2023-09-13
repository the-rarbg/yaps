import React from 'react'

export default function FilmCasts({ casts }) {
  return (
    <div className='mb-10'>
      <h3 className='mb-2 md:text-lg'>Casts</h3>
      <ul className='flex flex-wrap text-xs md:text-sm'>
        {renderCasts(casts)}
      </ul>
    </div>
  )
}

function renderCasts(arr) {
  if (arr.length !== 0) {
    return arr.map(cast => {
      return (
        <li
          key={cast.credit_id}
          className='mr-2 mb-2 flex items-center justify-center rounded-md border-[1px] py-px px-2 text-app-pure-white'
        >
          {cast.name}
        </li>
      )
    })
  } else {
    return 'N/A'
  }
}
