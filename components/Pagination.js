import Link from 'next/link'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'

export default function Pagination({
  currentPage,
  prevHref,
  nextHref,
  isFirst,
  isLast,
  goToPreviousPage,
  goToNextPage,
  totalPages,
}) {
  return (
    <div className='my-16 flex items-center justify-center'>
      <Link href={prevHref} as={prevHref}>
        <a
          onClick={goToPreviousPage}
          className={
            isFirst
              ? 'disabled-link flex cursor-not-allowed items-center justify-center rounded-lg rounded-r-none border-2 py-2 pl-4 pr-6 font-medium'
              : 'flex items-center justify-center rounded-lg rounded-r-none border-2 py-2 pl-4 pr-6 font-medium hover:bg-app-pure-white hover:text-app-dark-blue'
          }
        >
          <TiArrowLeftThick className='mr-2' />
          <span>Prev</span>
        </a>
      </Link>
      <p className='border-t-2 border-b-2 bg-app-pure-white py-2 px-4 text-app-dark-blue'>
        Page {currentPage} of {totalPages}
      </p>
      <Link href={nextHref} as={nextHref}>
        <a
          onClick={goToNextPage}
          className={
            isLast
              ? 'disabled-link flex cursor-not-allowed items-center justify-center rounded-lg rounded-l-none border-2 py-2 pr-4 pl-6 font-medium'
              : 'flex items-center justify-center rounded-lg rounded-l-none border-2 py-2 pr-4 pl-6 font-medium hover:bg-app-pure-white hover:text-app-dark-blue'
          }
        >
          <span>Next</span>
          <TiArrowRightThick className='ml-2' />
        </a>
      </Link>
    </div>
  )
}
