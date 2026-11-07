import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CollectionSearch from '../../components/CollectionSearch'
import Loading from '../../components/Loading'
import PageTitle from '../../components/PageTitle'
import PaginationImproved from '../../components/PaginationImproved'
import SearchBar from '../../components/SearchBar'
import { fetcher, pathToSearchTV } from '../../utils'

export default function OnAirTV() {
  const router = useRouter()
  const { page } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  // the query is empty on the first render (was Number(undefined) = NaN), and
  // the server route keeps the TMDB key out of the browser
  useEffect(() => {
    if (router.isReady) setCurrentPage(Math.max(1, parseInt(page, 10) || 1))
  }, [router.isReady, page])
  const { data, error } = useSWR(router.isReady ? `/api/tv/onair/${currentPage}` : null, fetcher)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  return (
    <div>
      <Head>
        <title>TV Series On The Air | Yaps</title>
      </Head>
      <SearchBar
        placeholder='Search for TV series'
        searchPath={pathToSearchTV}
      />
      <PageTitle title='tv series on air' />
      {data ? (
        <>
          <CollectionSearch isGenre arr={data.results || []} media_type='tv' />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`/tv/onair?page=${currentPage - 1}`}
            nextHref={`/tv/onair?page=${currentPage + 1}`}
            isFirst={isFirst}
            isLast={isLast}
            goToPreviousPage={() => setCurrentPage(currentPage - 1)}
            goToNextPage={() => setCurrentPage(currentPage + 1)}
            totalPages={data.total_pages}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
