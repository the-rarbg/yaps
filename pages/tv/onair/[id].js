import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PageTitle from '../../../components/PageTitle'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { fetcher, pathToSearchTV } from '../../../utils'

export default function TVSeriesOnTheAir() {
  const router = useRouter()
  const { id } = router.query
  const currentPage = Number(id)
  const { data, error } = useSWR(`/api/tv/onair/${currentPage}`, fetcher)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  return (
    <div>
      <Head>
        <title>TV Series On The Air | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for TV Series'
        searchPath={pathToSearchTV}
      />
      <PageTitle title='TV Series On The Air' />
      {data ? (
        <>
          <CollectionSearch isGenre arr={data.results} media_type='tv' />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`/tv/onair/${currentPage - 1}`}
            nextHref={`/tv/onair/${currentPage + 1}`}
            isFirst={isFirst}
            isLast={isLast}
            goToPreviousPage={() => currentPage - 1}
            goToNextPage={() => currentPage + 1}
            totalPages={data.total_pages}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
