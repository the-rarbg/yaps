export default function FilmInfo({
  firstAir,
  lastAir,
  language,
  length,
  media_type,
  status,
  year,
}) {
  return (
    <>
      {media_type === 'movie' ? (
        <div className='mb-6 flex items-center dark:text-app-placeholder text-app-dark-blue justify-between text-left text-sm lg:w-10/12 lg:text-lg'>
          <div>
            <p className='mb-1 '>Length</p>
            <p className=''>{length.split("?")[0]}</p>
          </div>
          <div>
            <p className='mb-1 '>Language</p>
            <p className=''>{language}</p>
          </div>
          <div>
            <p className='mb-1'>Year</p>
            <p className=''>{year}</p>
          </div>
          <div>
            <p className='mb-1'>Status</p>
            <p className=''>{status}</p>
          </div>
        </div>
      ) : (
        <div className='mb-6 flex items-center justify-between text-left  dark:text-app-placeholder text-app-dark-blue  text-sm lg:w-11/12 lg:text-lg'>
          <div>
            <p className='mb-1 '>Language</p>
            <p className=''>{language}</p>
          </div>
          <div>
            <p className='mb-1 '>First Air</p>
            <p className=''>{firstAir}</p>
          </div>
          <div>
            <p className='mb-1 '>Last Air</p>
            <p className=''>{lastAir}</p>
          </div>
          <div>
            <p className='mb-1 '>Status</p>
            <p className=''>{status}</p>
          </div>
        </div>
      )}
    </>
  )
}
