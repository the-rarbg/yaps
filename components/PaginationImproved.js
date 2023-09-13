import Pagination from './Pagination'

export default function PaginationImproved({
  currentPageAdvance,
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
    <>
      <div style={{ display: 'none' }}>
        <Pagination
          currentPage={currentPageAdvance}
          prevHref={prevHref}
          nextHref={nextHref}
          isFirst={isFirst}
          isLast={isLast}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          totalPages={totalPages}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        prevHref={prevHref}
        nextHref={nextHref}
        isFirst={isFirst}
        isLast={isLast}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        totalPages={totalPages}
      />
    </>
  )
}
