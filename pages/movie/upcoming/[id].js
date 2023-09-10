import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PageTitle from '../../../components/PageTitle'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { fetcher, pathToSearchMovie } from '../../../utils'

export default function UpcomingMovies() {
  const router = useRouter()
  const { id } = router.query
  const currentPage = Number(id)
  const { data, error } = useSWR(`/api/movie/upcoming/${id}`, fetcher)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  return (
    <div>
      <Head>
        <title>Upcoming Movies | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      <PageTitle title='upcoming movies' />
      {data ? (
        <>
          <CollectionSearch isGenre arr={data.results} />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`/movie/upcoming/${currentPage - 1}`}
            nextHref={`/movie/upcoming/${currentPage + 1}`}
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
