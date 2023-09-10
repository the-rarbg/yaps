import IconCategoryMovie from './icons/IconCategoryMovie'
import IconCategoryTv from './icons/IconCategoryTv'

export default function CardInfo({
  category,
  isTrending,
  rating,
  title,
  year,
}) {
  return (
    <div
      className={
        isTrending
          ? 'absolute left-4 bottom-4 z-40 h-fit w-fit truncate text-ellipsis'
          : null
      }
    >
      <div
        className={
          isTrending
            ? 'mt-2 mb-1 flex text-[11px] font-light text-app-pure-white md:text-[15px]'
            : 'mt-2 mb-1 flex text-[11px] font-light text-app-grey md:text-[13px]'
        }
      >
        <p>{renderYear(year)}</p>
        <div
          className={
            isTrending
              ? 'flex items-center px-[8px] before:content-["•"]'
              : 'flex items-center px-[6px] before:content-["•"]'
          }
        >
          {renderCategoryIcon(category)}
          <p className={isTrending ? 'pl-[6px] pr-[6px]' : 'pl-1 pr-1'}>
            {renderCategoryText(category)}
          </p>
        </div>
        {/* TODO: Add this back only after I find an appropriate way to get the rating info from TMDB api */}
        {/* <p>{renderRating(rating)}</p> */}
      </div>
      <h2
        className={
          isTrending
            ? 'md:heading-sm text-ellips w-[200px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[420px] md:h-6'
            : 'md:heading-xs text-ellips w-[150px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[180px] md:w-[200px] lg:w-[268px]'
        }
      >
        {title}
      </h2>
    </div>
  )
}

function renderYear(year) {
  if (!year) {
    return 'N/A'
  } else {
    return year.substring(0, 4)
  }
}

function renderCategoryIcon(category) {
  if (category === 'movie') {
    return <IconCategoryMovie className='pl-1 text-base' />
  } else {
    return <IconCategoryTv className='pl-1 text-base' />
  }
}

function renderCategoryText(category) {
  if (category === 'movie') {
    return 'Movie'
  } else {
    return 'TV Series'
  }
}

function renderRating(rating) {
  if (rating === true) {
    return '18+'
  } else {
    return 'E'
  }
}
